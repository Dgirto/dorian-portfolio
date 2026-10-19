#include <Wire.h>
#include <Servo.h>
#include <Adafruit_NeoPixel.h>

#define DIRECCION  8
#define PIN_NEO    6
#define NUM_LEDS   12
#define PIN_BUZZER 8
#define PIN_SERVO  9

Adafruit_NeoPixel luces(NUM_LEDS, PIN_NEO, NEO_GRB + NEO_KHZ800);
Servo puerta;

volatile byte alerta = 0;
byte alertaActual = 255;
int paso = 0;
unsigned long ultimoPaso = 0;

void setup() {
  Wire.begin(DIRECCION);
  Wire.onReceive(recibir);
  puerta.attach(PIN_SERVO);
  puerta.write(0);
  luces.begin();
  luces.show();
}

void loop() {
  byte nueva = alerta;
  if (nueva != alertaActual) {
    alertaActual = nueva;
    paso = 0;
    if (alertaActual == 0) {
      puerta.write(0);                 // Cerrar puerta
      noTone(PIN_BUZZER);
      luces.clear();
      luces.show();
    } else {
      puerta.write(90);                // Abrir puerta de emergencia
    }
  }

  if (alertaActual != 0 && millis() - ultimoPaso >= 150) {
    ultimoPaso = millis();
    animarLuces();
    sonarSirena();
    paso = (paso + 1) % 240;
  }
}

void recibir(int n) {
  while (Wire.available()) alerta = Wire.read();
}

uint32_t colorAlerta() {
  if (alertaActual == 1) return luces.Color(255, 140, 0);  // Sismo: naranja
  if (alertaActual == 2) return luces.Color(255, 0, 0);    // Incendio: rojo
  return luces.Color(150, 0, 255);                         // Gas: morado
}

void animarLuces() {                   // Luces que "corren" hacia la salida
  luces.clear();
  for (int i = 0; i < 3; i++) {
    int pos = (paso - i + NUM_LEDS) % NUM_LEDS;
    luces.setPixelColor(pos, colorAlerta());
  }
  luces.show();
}

void sonarSirena() {                   // Un sonido distinto por evento
  if (alertaActual == 1) {
    tone(PIN_BUZZER, (paso % 2) ? 1200 : 800);
  } else if (alertaActual == 2) {
    tone(PIN_BUZZER, 600 + (paso % 8) * 100);
  } else {
    if (paso % 4 < 2) tone(PIN_BUZZER, 1000);
    else noTone(PIN_BUZZER);
  }
}
