#include <Wire.h>
#include <Keypad.h>
#include <Adafruit_LiquidCrystal.h>

#define DIR_ESCLAVO 8

const int PIN_TILT = 10;
const int PIN_GAS  = A0;
const int PIN_TEMP = A1;

const int    UMBRAL_GAS  = 300;   // Ajustar mirando el Monitor serie
const float  UMBRAL_TEMP = 50.0;  // °C
const String CLAVE       = "1234";

Adafruit_LiquidCrystal lcd(0);    // LCD I2C (MCP23008, dirección 32)

const byte FILAS = 4, COLUMNAS = 4;
char teclas[FILAS][COLUMNAS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};
byte pinesFilas[FILAS]       = {9, 8, 7, 6};
byte pinesColumnas[COLUMNAS] = {5, 4, 3, 2};
Keypad teclado = Keypad(makeKeymap(teclas), pinesFilas, pinesColumnas, FILAS, COLUMNAS);

// 0 = normal, 1 = sismo, 2 = incendio, 3 = gas
byte alerta = 0;
int tiltReposo;
String entrada = "";
unsigned long ultimaLectura = 0;
float temperatura = 0;
int gas = 0;

void setup() {
  Wire.begin();
  Serial.begin(9600);
  pinMode(PIN_TILT, INPUT_PULLUP);
  tiltReposo = digitalRead(PIN_TILT);   // Estado sin sismo

  lcd.begin(16, 2);
  lcd.setBacklight(1);
  lcd.print("Alerta Sismica");
  lcd.setCursor(0, 1);
  lcd.print("Iniciando...");
  delay(1500);
  lcd.clear();
}

void loop() {
  char tecla = teclado.getKey();
  if (tecla) procesarTecla(tecla);

  if (millis() - ultimaLectura >= 500) {
    ultimaLectura = millis();
    leerSensores();
    if (alerta == 0) alerta = detectarEvento();
    enviarAlerta();                      // Se reenvía siempre, por seguridad
    actualizarLCD();
  }
}

void leerSensores() {
  float voltaje = analogRead(PIN_TEMP) * 5.0 / 1024.0;
  temperatura = (voltaje - 0.5) * 100;
  gas = analogRead(PIN_GAS);

  Serial.print("Temp: ");      Serial.print(temperatura);
  Serial.print(" C | Gas: ");  Serial.print(gas);
  Serial.print(" | Tilt: ");   Serial.print(digitalRead(PIN_TILT));
  Serial.print(" | Alerta: "); Serial.println(alerta);
}

byte detectarEvento() {
  if (digitalRead(PIN_TILT) != tiltReposo) return 1;  // Sismo (máxima prioridad)
  if (temperatura > UMBRAL_TEMP)           return 2;  // Incendio
  if (gas > UMBRAL_GAS)                    return 3;  // Fuga de gas
  return 0;
}

void enviarAlerta() {
  Wire.beginTransmission(DIR_ESCLAVO);
  Wire.write(alerta);
  Wire.endTransmission();
}

void procesarTecla(char tecla) {
  if (alerta == 0) return;               // El teclado solo sirve en alerta

  if (tecla == '*') {
    entrada = "";                        // Borrar
  } else if (tecla == '#') {             // Confirmar
    if (entrada == CLAVE) {
      alerta = 0;
      enviarAlerta();
    } else {
      lcd.clear();
      lcd.print("Clave incorrecta");
      delay(1000);
      lcd.clear();
    }
    entrada = "";
  } else if (entrada.length() < 4) {
    entrada += tecla;
  }
  actualizarLCD();
}

void actualizarLCD() {
  lcd.setCursor(0, 0);
  if (alerta == 0) {
    lcd.print("T:");   lcd.print(temperatura, 1);
    lcd.print("C G:"); lcd.print(gas);
    lcd.print("    ");
    lcd.setCursor(0, 1);
    lcd.print("Estado: NORMAL  ");
  } else {
    const char* nombres[] = {"", "SISMO!  ", "INCENDIO", "FUGA GAS"};
    lcd.print("ALERTA ");
    lcd.print(nombres[alerta]);
    lcd.print(" ");
    lcd.setCursor(0, 1);
    lcd.print("Clave: ");
    for (unsigned int i = 0; i < entrada.length(); i++) lcd.print('*');
    for (unsigned int i = entrada.length(); i < 9; i++) lcd.print(' ');
  }
}
