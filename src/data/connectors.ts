// Generado a partir de los manifest.json públicos de github.com/Dgirto (catálogo de conectores de Ruvic AI).
// Para añadir un conector, agrega un objeto con la misma forma y su logo en public/logos/<repo-en-minúsculas>.svg.
import type { Connector } from '../types'

export const connectors: Connector[] = [
  {
    "id": "gmail",
    "repo": "Gmail",
    "name": "Gmail",
    "code": "CON-005",
    "description": "Lectura y envío de correos en Gmail (cuenta personal o Google Workspace) mediante OAuth2 con refresh token",
    "category": "messaging",
    "family": "productividad",
    "keywords": [
      "email",
      "correo",
      "correos",
      "gmail",
      "oauth",
      "oauth2",
      "google",
      "workspace"
    ],
    "authModes": [
      "Autorizar con Google (recomendado)",
      "Usar credenciales propias",
      "Refresh token manual"
    ],
    "operations": [
      "mail.list",
      "mail.read",
      "mail.send",
      "mail.send_with_attachment"
    ]
  },
  {
    "id": "gmail_imap",
    "repo": "Gmail-IMAP-SMTP",
    "name": "Gmail (IMAP/SMTP)",
    "code": "CON-005.1",
    "description": "Lectura y envío de correos en Gmail mediante IMAP/SMTP con usuario y Contraseña de aplicación, sin flujo OAuth",
    "category": "messaging",
    "family": "productividad",
    "keywords": [
      "email",
      "correo",
      "correos",
      "gmail",
      "imap",
      "smtp",
      "app password",
      "contraseña de aplicación",
      "google"
    ],
    "authModes": [
      "Usuario y Contraseña de aplicación"
    ],
    "operations": [
      "mail.list",
      "mail.read",
      "mail.send",
      "mail.send_with_attachment"
    ]
  },
  {
    "id": "gmail_workspace",
    "repo": "Gmail-Workspace",
    "name": "Gmail (Google Workspace — cuenta de servicio)",
    "code": "CON-005.2",
    "description": "Lectura y envío de correos en múltiples buzones de un dominio Google Workspace mediante una cuenta de servicio con delegación de dominio",
    "category": "messaging",
    "family": "productividad",
    "keywords": [
      "email",
      "correo",
      "correos",
      "gmail",
      "workspace",
      "google",
      "domain-wide delegation",
      "delegación de dominio",
      "cuenta de servicio",
      "service account"
    ],
    "authModes": [
      "Cuenta de servicio (delegación de dominio)"
    ],
    "operations": [
      "mail.list",
      "mail.read",
      "mail.send",
      "mail.send_with_attachment"
    ]
  },
  {
    "id": "sheets",
    "repo": "Sheets",
    "name": "Google Sheets",
    "code": "CON-006",
    "description": "Lectura y escritura de hojas de cálculo de Google Sheets (cuenta personal o Google Workspace) mediante OAuth2 con refresh token",
    "category": "productivity",
    "family": "productividad",
    "keywords": [
      "sheets",
      "google sheets",
      "hoja de calculo",
      "hoja de cálculo",
      "spreadsheet",
      "excel de google",
      "planilla",
      "oauth",
      "google",
      "workspace"
    ],
    "authModes": [
      "Autorizar con Google (recomendado)",
      "Usar credenciales propias",
      "Refresh token manual"
    ],
    "operations": [
      "sheets.read",
      "sheets.update",
      "sheets.append"
    ]
  },
  {
    "id": "sheets_workspace",
    "repo": "Sheets-Workspace",
    "name": "Google Sheets (Google Workspace — cuenta de servicio)",
    "code": "CON-006.1",
    "description": "Lectura y escritura de hojas de cálculo accesibles por usuarios de un dominio Google Workspace mediante una cuenta de servicio con delegación de dominio",
    "category": "productivity",
    "family": "productividad",
    "keywords": [
      "sheets",
      "google sheets",
      "hoja de calculo",
      "hoja de cálculo",
      "spreadsheet",
      "workspace",
      "google",
      "domain-wide delegation",
      "delegación de dominio",
      "cuenta de servicio",
      "service account"
    ],
    "authModes": [
      "Cuenta de servicio (delegación de dominio)"
    ],
    "operations": [
      "sheets.read",
      "sheets.update",
      "sheets.append"
    ]
  },
  {
    "id": "drive",
    "repo": "Drive",
    "name": "Drive (Google Workspace — cuenta de servicio)",
    "code": "CON-007",
    "description": "Listar, leer, descargar y subir archivos en el Google Drive de usuarios de un dominio Google Workspace mediante una cuenta de servicio con delegación de dominio",
    "category": "storage",
    "family": "nube",
    "keywords": [
      "drive",
      "google drive",
      "archivo",
      "archivos",
      "documento",
      "workspace",
      "google",
      "domain-wide delegation",
      "delegación de dominio",
      "cuenta de servicio",
      "service account"
    ],
    "authModes": [
      "Cuenta de servicio (delegación de dominio)"
    ],
    "operations": [
      "file.list",
      "file.read",
      "file.download",
      "file.upload",
      "folder.create"
    ]
  },
  {
    "id": "drive_oauth",
    "repo": "Drive-OAuth",
    "name": "Drive (OAuth2)",
    "code": "CON-007.1",
    "description": "Listar, leer, descargar y subir archivos en Google Drive (cuenta personal o Google Workspace individual) mediante OAuth2 con refresh token",
    "category": "storage",
    "family": "nube",
    "keywords": [
      "drive",
      "google drive",
      "archivo",
      "archivos",
      "documento",
      "oauth",
      "oauth2",
      "google",
      "gmail personal"
    ],
    "authModes": [
      "Autorizar con Google (recomendado)",
      "Usar credenciales propias",
      "Refresh token manual"
    ],
    "operations": [
      "file.list",
      "file.read",
      "file.download",
      "file.upload",
      "folder.create"
    ]
  },
  {
    "id": "docs",
    "repo": "Docs",
    "name": "Google Docs",
    "code": "CON-008",
    "description": "Lectura, creación y edición de documentos de Google Docs (cuenta personal o Google Workspace) mediante OAuth2 con refresh token",
    "category": "productivity",
    "family": "productividad",
    "keywords": [
      "docs",
      "google docs",
      "documento",
      "documentos",
      "document",
      "acta",
      "plantilla",
      "oauth",
      "google",
      "workspace"
    ],
    "authModes": [
      "Autorizar con Google (recomendado)",
      "Usar credenciales propias",
      "Refresh token manual"
    ],
    "operations": [
      "docs.read",
      "docs.create",
      "docs.append",
      "docs.replace",
      "docs.create_from_template",
      "docs.export_pdf"
    ]
  },
  {
    "id": "docs_workspace",
    "repo": "Docs-Workspace",
    "name": "Google Docs (Google Workspace — cuenta de servicio)",
    "code": "CON-008.1",
    "description": "Lectura, creación y edición de documentos accesibles por usuarios de un dominio Google Workspace mediante una cuenta de servicio con delegación de dominio",
    "category": "productivity",
    "family": "productividad",
    "keywords": [
      "docs",
      "google docs",
      "documento",
      "documentos",
      "workspace",
      "google",
      "domain-wide delegation",
      "delegación de dominio",
      "cuenta de servicio",
      "service account"
    ],
    "authModes": [
      "Cuenta de servicio (delegación de dominio)"
    ],
    "operations": [
      "docs.read",
      "docs.create",
      "docs.append",
      "docs.replace",
      "docs.create_from_template",
      "docs.export_pdf"
    ]
  },
  {
    "id": "calendar",
    "repo": "Calendar",
    "name": "Google Calendar",
    "code": "CON-009",
    "description": "Creación, listado y cancelación de eventos de Google Calendar (cuenta personal o Google Workspace) mediante OAuth2 con refresh token",
    "category": "productivity",
    "family": "productividad",
    "keywords": [
      "calendar",
      "calendario",
      "evento",
      "eventos",
      "event",
      "events",
      "reunión",
      "meeting",
      "cita",
      "agenda",
      "oauth",
      "google",
      "workspace"
    ],
    "authModes": [
      "Autorizar con Google (recomendado)",
      "Usar credenciales propias",
      "Refresh token manual"
    ],
    "operations": [
      "calendar.create_event",
      "calendar.list_events",
      "calendar.cancel_event"
    ]
  },
  {
    "id": "calendar_workspace",
    "repo": "Calendar-Workspace",
    "name": "Google Calendar (Google Workspace — cuenta de servicio)",
    "code": "CON-009.1",
    "description": "Creación, listado y cancelación de eventos de los calendarios de usuarios de un dominio Google Workspace mediante una cuenta de servicio con delegación de dominio",
    "category": "productivity",
    "family": "productividad",
    "keywords": [
      "calendar",
      "calendario",
      "evento",
      "eventos",
      "event",
      "reunión",
      "meeting",
      "agenda",
      "workspace",
      "google",
      "domain-wide delegation",
      "delegación de dominio",
      "cuenta de servicio",
      "service account"
    ],
    "authModes": [
      "Cuenta de servicio (delegación de dominio)"
    ],
    "operations": [
      "calendar.create_event",
      "calendar.list_events",
      "calendar.cancel_event"
    ]
  },
  {
    "id": "postgresql",
    "repo": "PostgreSQL",
    "name": "PostgreSQL",
    "code": "CON-016",
    "description": "Consulta de solo lectura a bases de datos PostgreSQL: tablas, datos, estadísticas y plan de ejecución de queries",
    "category": "database",
    "family": "datos",
    "keywords": [
      "postgresql",
      "postgres",
      "sql",
      "database",
      "base de datos",
      "solo lectura",
      "read-only"
    ],
    "authModes": [
      "Usuario y contraseña"
    ],
    "operations": [
      "db.list_tables",
      "db.read",
      "db.stats",
      "db.explain"
    ]
  },
  {
    "id": "mysql",
    "repo": "MySQL-MariaDB",
    "name": "MySQL / MariaDB",
    "code": "CON-017",
    "description": "Consulta de solo lectura a bases de datos MySQL o MariaDB: tablas, datos, estadísticas y planes de ejecución",
    "category": "database",
    "family": "datos",
    "keywords": [
      "mysql",
      "mariadb",
      "sql",
      "database",
      "base de datos",
      "solo lectura",
      "read-only"
    ],
    "authModes": [
      "Usuario y contraseña"
    ],
    "operations": [
      "db.list_tables",
      "db.read",
      "db.stats",
      "db.explain"
    ]
  },
  {
    "id": "mssql",
    "repo": "SQL-Server",
    "name": "SQL Server",
    "code": "CON-018",
    "description": "Consulta de solo lectura a bases de datos Microsoft SQL Server: tablas, datos, estadísticas y plan estimado de queries",
    "category": "database",
    "family": "datos",
    "keywords": [
      "sql server",
      "mssql",
      "sql",
      "database",
      "base de datos",
      "solo lectura",
      "read-only"
    ],
    "authModes": [
      "Usuario y contraseña (SQL Authentication)"
    ],
    "operations": [
      "db.list_tables",
      "db.read",
      "db.stats",
      "db.explain"
    ]
  },
  {
    "id": "oracle",
    "repo": "Oracle",
    "name": "Oracle Database",
    "code": "CON-019",
    "description": "Consulta de solo lectura a bases de datos Oracle: tablas, datos, estadísticas y EXPLAIN PLAN de queries",
    "category": "database",
    "family": "datos",
    "keywords": [
      "oracle",
      "sql",
      "database",
      "base de datos",
      "solo lectura",
      "read-only"
    ],
    "authModes": [
      "Usuario y contraseña"
    ],
    "operations": [
      "db.list_tables",
      "db.read",
      "db.stats",
      "db.explain"
    ]
  },
  {
    "id": "mongodb",
    "repo": "MongoDB",
    "name": "MongoDB",
    "code": "CON-020",
    "description": "Consulta de solo lectura a colecciones MongoDB: listar colecciones, leer documentos con filtro, contar documentos y estadísticas de colección",
    "category": "database",
    "family": "datos",
    "keywords": [
      "mongodb",
      "mongo",
      "nosql",
      "database",
      "base de datos",
      "colección",
      "collection",
      "solo lectura",
      "read-only"
    ],
    "authModes": [
      "Usuario y contraseña"
    ],
    "operations": [
      "db.list_collections",
      "db.read",
      "db.count",
      "db.stats"
    ]
  },
  {
    "id": "redis",
    "repo": "Redis",
    "name": "Redis",
    "code": "CON-021",
    "description": "Lectura y escritura de claves en Redis: leer clave, escribir clave con TTL y listar claves por patrón",
    "category": "database",
    "family": "datos",
    "keywords": [
      "redis",
      "cache",
      "caché",
      "key-value",
      "clave-valor",
      "ttl",
      "database",
      "base de datos"
    ],
    "authModes": [
      "Host y contraseña"
    ],
    "operations": [
      "redis.read",
      "redis.write",
      "redis.list_keys"
    ]
  },
  {
    "id": "elasticsearch",
    "repo": "Elasticsearch",
    "name": "Elasticsearch",
    "code": "CON-022",
    "description": "Búsqueda y consulta de solo lectura en Elasticsearch: listar índices, buscar documentos y contar resultados por consulta",
    "category": "database",
    "family": "datos",
    "keywords": [
      "elasticsearch",
      "elastic",
      "búsqueda",
      "search",
      "índice",
      "index",
      "database",
      "base de datos",
      "solo lectura",
      "read-only"
    ],
    "authModes": [
      "Usuario y contraseña"
    ],
    "operations": [
      "db.list_indices",
      "db.search",
      "db.count"
    ]
  },
  {
    "id": "aws_s3",
    "repo": "AWS-S3",
    "name": "AWS S3",
    "code": "CON-023",
    "description": "Gestión de objetos en Amazon S3: listar objetos, subir archivo, descargar archivo y generar URL prefirmada",
    "category": "cloud",
    "family": "nube",
    "keywords": [
      "aws",
      "s3",
      "amazon",
      "storage",
      "almacenamiento",
      "cloud",
      "nube",
      "objetos",
      "objects"
    ],
    "authModes": [
      "Access Key ID y Secret Access Key"
    ],
    "operations": [
      "s3.list_objects",
      "s3.upload",
      "s3.download",
      "s3.presigned_url"
    ]
  },
  {
    "id": "aws_lambda",
    "repo": "AWS-Lambda",
    "name": "AWS Lambda",
    "code": "CON-024",
    "description": "Invocación de funciones AWS Lambda: invocar función con payload, consultar resultado en logs recientes y listar funciones",
    "category": "cloud",
    "family": "nube",
    "keywords": [
      "aws",
      "lambda",
      "amazon",
      "serverless",
      "función",
      "function",
      "cloud",
      "nube",
      "invocar",
      "invoke"
    ],
    "authModes": [
      "Access Key ID y Secret Access Key"
    ],
    "operations": [
      "lambda.list_functions",
      "lambda.invoke",
      "lambda.get_logs"
    ]
  },
  {
    "id": "aws_cloudwatch",
    "repo": "AWS-CloudWatch",
    "name": "AWS CloudWatch",
    "code": "CON-025",
    "description": "Consulta de métricas y logs en AWS: consultar métricas, leer logs recientes y listar alarmas activas",
    "category": "cloud",
    "family": "nube",
    "keywords": [
      "aws",
      "cloudwatch",
      "amazon",
      "métricas",
      "metrics",
      "logs",
      "alarmas",
      "alarms",
      "cloud",
      "nube",
      "monitoreo",
      "monitoring"
    ],
    "authModes": [
      "Access Key ID y Secret Access Key"
    ],
    "operations": [
      "cloudwatch.get_metric_statistics",
      "cloudwatch.get_logs",
      "cloudwatch.list_active_alarms"
    ]
  },
  {
    "id": "azure_blob",
    "repo": "Azure-Blob-Storage",
    "name": "Azure Blob Storage",
    "code": "CON-026",
    "description": "Gestión de blobs en Azure Storage: listar blobs, subir archivo y descargar archivo",
    "category": "cloud",
    "family": "nube",
    "keywords": [
      "azure",
      "blob",
      "storage",
      "microsoft",
      "almacenamiento",
      "cloud",
      "nube",
      "objetos",
      "objects"
    ],
    "authModes": [
      "Nombre de cuenta y clave de acceso"
    ],
    "operations": [
      "blob.list",
      "blob.upload",
      "blob.download"
    ]
  },
  {
    "id": "azure_monitor",
    "repo": "Azure-Monitor",
    "name": "Azure Monitor",
    "code": "CON-027",
    "description": "Consulta de métricas y alertas en Azure: consultar métricas de un recurso y listar alertas activas",
    "category": "cloud",
    "family": "nube",
    "keywords": [
      "azure",
      "monitor",
      "microsoft",
      "métricas",
      "metrics",
      "alertas",
      "alerts",
      "cloud",
      "nube",
      "monitoreo",
      "monitoring"
    ],
    "authModes": [
      "Service Principal (Azure AD)"
    ],
    "operations": [
      "monitor.get_metrics",
      "monitor.list_active_alerts"
    ]
  },
  {
    "id": "gcs",
    "repo": "Google-Cloud-Storage",
    "name": "Google Cloud Storage",
    "code": "CON-028",
    "description": "Gestión de objetos en Google Cloud Storage: listar objetos, subir archivo y descargar archivo",
    "category": "cloud",
    "family": "nube",
    "keywords": [
      "gcs",
      "google cloud storage",
      "gcp",
      "google",
      "storage",
      "almacenamiento",
      "cloud",
      "nube",
      "objetos",
      "objects"
    ],
    "authModes": [
      "Cuenta de servicio"
    ],
    "operations": [
      "gcs.list_objects",
      "gcs.upload",
      "gcs.download"
    ]
  },
  {
    "id": "bigquery",
    "repo": "BigQuery",
    "name": "BigQuery",
    "code": "CON-029",
    "description": "Consulta de datos en BigQuery: ejecutar consultas SQL de solo lectura, listar datasets y tablas, y estimar el costo de una consulta antes de ejecutarla",
    "category": "cloud",
    "family": "nube",
    "keywords": [
      "bigquery",
      "google",
      "gcp",
      "sql",
      "consulta",
      "query",
      "datawarehouse",
      "cloud",
      "nube",
      "solo lectura",
      "read-only"
    ],
    "authModes": [
      "Cuenta de servicio"
    ],
    "operations": [
      "bigquery.list_datasets",
      "bigquery.list_tables",
      "bigquery.execute_query",
      "bigquery.estimate_cost"
    ]
  },
  {
    "id": "misp",
    "repo": "MISP",
    "name": "MISP",
    "code": "CON-049",
    "description": "Intercambio de indicadores de amenaza (threat intel) en MISP: buscar un IOC, crear un evento y agregar un atributo",
    "category": "security",
    "family": "seguridad",
    "keywords": [
      "misp",
      "ciberseguridad",
      "cybersecurity",
      "threat intel",
      "threat intelligence",
      "ioc",
      "indicadores de compromiso",
      "eventos",
      "atributos"
    ],
    "authModes": [
      "Auth Key"
    ],
    "operations": [
      "threat_intel.search_ioc",
      "threat_intel.create_event",
      "threat_intel.add_attribute"
    ]
  },
  {
    "id": "thehive",
    "repo": "TheHive",
    "name": "TheHive",
    "code": "CON-050",
    "description": "Gestión de casos e incidentes de seguridad en TheHive: crear caso, agregar tarea, actualizar estado y agregar observable",
    "category": "security",
    "family": "seguridad",
    "keywords": [
      "thehive",
      "ciberseguridad",
      "cybersecurity",
      "incidentes",
      "incident response",
      "soar",
      "casos",
      "observables",
      "ioc"
    ],
    "authModes": [
      "API Key"
    ],
    "operations": [
      "security.create_case",
      "security.add_task",
      "security.update_case_status",
      "security.add_observable"
    ]
  },
  {
    "id": "tenable",
    "repo": "Tenable-Nessus",
    "name": "Tenable / Nessus",
    "code": "CON-051",
    "description": "Consulta de solo lectura de vulnerabilidades detectadas en Tenable.io: listar vulnerabilidades por activo, consultar un escaneo y exportar sus resultados",
    "category": "security",
    "family": "seguridad",
    "keywords": [
      "tenable",
      "nessus",
      "vulnerabilidades",
      "vulnerabilities",
      "ciberseguridad",
      "cybersecurity",
      "escaneo",
      "scan"
    ],
    "authModes": [
      "API Keys"
    ],
    "operations": [
      "security.list_vulnerabilities_by_asset",
      "security.get_scan",
      "security.export_scan_results"
    ]
  },
  {
    "id": "fortigate",
    "repo": "FortiGate",
    "name": "Fortinet FortiGate",
    "code": "CON-052",
    "description": "Administración de políticas y objetos en FortiGate: consultar políticas de firewall, agregar un objeto de dirección y consultar logs de tráfico",
    "category": "security",
    "family": "seguridad",
    "keywords": [
      "fortigate",
      "fortinet",
      "firewall",
      "ciberseguridad",
      "cybersecurity",
      "políticas",
      "policies"
    ],
    "authModes": [
      "API Token"
    ],
    "operations": [
      "security.list_policies",
      "security.add_address_object",
      "security.get_logs"
    ]
  },
  {
    "id": "panos",
    "repo": "Palo-Alto-PAN-OS",
    "name": "Palo Alto PAN-OS",
    "code": "CON-053",
    "description": "Administración de un firewall Palo Alto PAN-OS: consultar reglas de seguridad, agregar un objeto de dirección y confirmar (commit) los cambios",
    "category": "security",
    "family": "seguridad",
    "keywords": [
      "palo alto",
      "pan-os",
      "panos",
      "firewall",
      "ciberseguridad",
      "cybersecurity",
      "reglas",
      "rules",
      "commit"
    ],
    "authModes": [
      "API Key"
    ],
    "operations": [
      "security.list_rules",
      "security.add_object",
      "security.commit"
    ]
  },
  {
    "id": "umbrella",
    "repo": "Cisco-Umbrella",
    "name": "Cisco Umbrella",
    "code": "CON-054",
    "description": "Seguridad DNS y filtrado web con Cisco Umbrella: consultar reputación de un dominio, agregarlo a la lista de bloqueo y consultar actividad reciente",
    "category": "security",
    "family": "seguridad",
    "keywords": [
      "cisco umbrella",
      "umbrella",
      "dns",
      "ciberseguridad",
      "cybersecurity",
      "filtrado web",
      "web filtering",
      "dominio",
      "domain",
      "bloqueo",
      "blocklist"
    ],
    "authModes": [
      "API Keys (Investigate + Enforcement + Reporting)"
    ],
    "operations": [
      "security.query_domain",
      "security.add_to_blocklist",
      "security.get_activity"
    ]
  },
  {
    "id": "okta",
    "repo": "Okta",
    "name": "Okta",
    "code": "CON-055",
    "description": "Gestión de identidades y accesos en Okta: consultar un usuario, suspenderlo o activarlo, y listar sus grupos",
    "category": "security",
    "family": "seguridad",
    "keywords": [
      "okta",
      "identidad",
      "identity",
      "iam",
      "ciberseguridad",
      "cybersecurity",
      "usuarios",
      "users",
      "grupos",
      "groups",
      "sso"
    ],
    "authModes": [
      "API Token"
    ],
    "operations": [
      "identity.get_user",
      "identity.set_user_status",
      "identity.list_groups"
    ]
  },
  {
    "id": "cassandra",
    "repo": "Cassandra",
    "name": "Cassandra",
    "code": "CON-056",
    "description": "Consulta de solo lectura en Apache Cassandra: listar keyspaces y tablas, leer filas con límite y ejecutar CQL de lectura",
    "category": "database",
    "family": "datos",
    "keywords": [
      "cassandra",
      "apache cassandra",
      "cql",
      "base de datos",
      "database",
      "solo lectura",
      "read-only",
      "nosql"
    ],
    "authModes": [
      "Usuario y contraseña (clúster propio)",
      "DataStax Astra DB (cloud)"
    ],
    "operations": [
      "db.list_keyspaces_and_tables",
      "db.read_rows",
      "db.execute_cql"
    ]
  },
  {
    "id": "snowflake",
    "repo": "Snowflake",
    "name": "Snowflake",
    "code": "CON-057",
    "description": "Consulta y análisis de datos en Snowflake: ejecutar consultas SQL de solo lectura, listar bases de datos/esquemas y estimar el alcance de una consulta antes de ejecutarla",
    "category": "database",
    "family": "datos",
    "keywords": [
      "snowflake",
      "sql",
      "data warehouse",
      "base de datos",
      "database",
      "solo lectura",
      "read-only",
      "analytics"
    ],
    "authModes": [
      "Usuario y contraseña"
    ],
    "operations": [
      "db.execute_query",
      "db.list_databases_and_schemas",
      "db.estimate_query_cost"
    ]
  },
  {
    "id": "clickhouse",
    "repo": "ClickHouse",
    "name": "ClickHouse",
    "code": "CON-058",
    "description": "Consulta analítica de solo lectura sobre ClickHouse: ejecutar consultas SQL, listar tablas y consultar estadísticas de una tabla",
    "category": "database",
    "family": "datos",
    "keywords": [
      "clickhouse",
      "sql",
      "olap",
      "base de datos",
      "database",
      "solo lectura",
      "read-only",
      "analytics"
    ],
    "authModes": [
      "Usuario y contraseña"
    ],
    "operations": [
      "db.execute_query",
      "db.list_tables",
      "db.table_stats"
    ]
  },
  {
    "id": "dynamodb",
    "repo": "AWS-DynamoDB-API",
    "name": "AWS DynamoDB API",
    "code": "CON-067",
    "description": "Operaciones directas sobre tablas DynamoDB: escribir/leer/eliminar un ítem, consultar por partition key y describir la tabla",
    "category": "cloud",
    "family": "nube",
    "keywords": [
      "aws",
      "dynamodb",
      "amazon",
      "nosql",
      "base de datos",
      "database",
      "item",
      "tabla",
      "table"
    ],
    "authModes": [
      "Access Key ID y Secret Access Key"
    ],
    "operations": [
      "dynamo.put_item",
      "dynamo.get_item",
      "dynamo.query",
      "dynamo.delete_item",
      "dynamo.describe_table"
    ]
  },
  {
    "id": "ec2",
    "repo": "AWS-EC2",
    "name": "AWS EC2",
    "code": "CON-068",
    "description": "Consulta y control de instancias EC2: listar instancias, iniciar/detener una instancia y consultar su estado",
    "category": "cloud",
    "family": "nube",
    "keywords": [
      "aws",
      "ec2",
      "amazon",
      "instancia",
      "instance",
      "virtual machine",
      "vm",
      "cloud",
      "nube"
    ],
    "authModes": [
      "Access Key ID y Secret Access Key"
    ],
    "operations": [
      "ec2.list_instances",
      "ec2.start_instance",
      "ec2.stop_instance",
      "ec2.get_instance_state"
    ]
  },
  {
    "id": "cost_explorer",
    "repo": "AWS-Cost-Explorer",
    "name": "AWS Cost Explorer",
    "code": "CON-069",
    "description": "Consulta de costos y uso de AWS: costo por servicio, costo por período y previsión de gasto",
    "category": "cloud",
    "family": "nube",
    "keywords": [
      "aws",
      "cost explorer",
      "costos",
      "cost",
      "gasto",
      "spend",
      "facturación",
      "billing",
      "amazon"
    ],
    "authModes": [
      "Access Key ID y Secret Access Key"
    ],
    "operations": [
      "cost.get_cost_by_service",
      "cost.get_cost_by_period",
      "cost.get_cost_forecast"
    ]
  },
  {
    "id": "secrets_manager",
    "repo": "AWS-Secrets-Manager",
    "name": "AWS Secrets Manager",
    "code": "CON-070",
    "description": "Lectura de secretos gestionados en AWS: obtener secreto, listar secretos y rotar (opcional)",
    "category": "cloud",
    "family": "nube",
    "keywords": [
      "aws",
      "secrets manager",
      "secretos",
      "secrets",
      "credenciales",
      "credentials",
      "amazon",
      "cloud"
    ],
    "authModes": [
      "Access Key ID y Secret Access Key"
    ],
    "operations": [
      "secrets.get_secret",
      "secrets.list_secrets",
      "secrets.rotate_secret"
    ]
  },
  {
    "id": "key_vault",
    "repo": "Azure-Key-Vault",
    "name": "Azure Key Vault",
    "code": "CON-071",
    "description": "Lectura de secretos, llaves y certificados en Azure Key Vault: obtener secreto, listar secretos y obtener certificado",
    "category": "cloud",
    "family": "nube",
    "keywords": [
      "azure",
      "key vault",
      "keyvault",
      "secretos",
      "secrets",
      "certificados",
      "certificates",
      "microsoft",
      "cloud",
      "nube"
    ],
    "authModes": [
      "Service Principal (Azure AD)"
    ],
    "operations": [
      "keyvault.get_secret",
      "keyvault.list_secrets",
      "keyvault.get_certificate"
    ]
  },
  {
    "id": "service_bus",
    "repo": "Azure-Service-Bus",
    "name": "Azure Service Bus",
    "code": "CON-072",
    "description": "Mensajería empresarial en Azure Service Bus: enviar mensaje a una cola, recibir mensaje y consultar métricas de la cola",
    "category": "cloud",
    "family": "nube",
    "keywords": [
      "azure",
      "service bus",
      "servicebus",
      "mensajeria",
      "messaging",
      "cola",
      "queue",
      "microsoft",
      "cloud",
      "nube"
    ],
    "authModes": [
      "Service Principal (Azure AD)"
    ],
    "operations": [
      "servicebus.send_message",
      "servicebus.receive_message",
      "servicebus.get_queue_metrics"
    ]
  },
  {
    "id": "azure_devops",
    "repo": "Azure-DevOps",
    "name": "Azure DevOps",
    "code": "CON-073",
    "description": "Gestión de trabajo en Azure DevOps: crear work items, consultar el estado de pipelines y agregar comentarios",
    "category": "devops",
    "family": "devops",
    "keywords": [
      "azure",
      "devops",
      "azure devops",
      "pipelines",
      "work items",
      "ci/cd",
      "microsoft",
      "cloud",
      "nube"
    ],
    "authModes": [
      "Personal Access Token (PAT)"
    ],
    "operations": [
      "azure_devops.create_work_item",
      "azure_devops.get_pipeline_status",
      "azure_devops.add_comment"
    ]
  },
  {
    "id": "intune",
    "repo": "Microsoft-Intune",
    "name": "Microsoft Intune",
    "code": "CON-074",
    "description": "Gestión de dispositivos en Microsoft Intune vía Microsoft Graph: listar dispositivos, consultar cumplimiento y disparar sincronización remota",
    "category": "cloud",
    "family": "nube",
    "keywords": [
      "microsoft",
      "intune",
      "mdm",
      "device management",
      "graph",
      "azure",
      "endpoint manager",
      "cloud",
      "nube"
    ],
    "authModes": [
      "Service Principal (Azure AD)"
    ],
    "operations": [
      "intune.list_devices",
      "intune.get_compliance",
      "intune.sync_device"
    ]
  },
  {
    "id": "pubsub",
    "repo": "Google-Pub-Sub",
    "name": "Google Pub/Sub",
    "code": "CON-075",
    "description": "Mensajería empresarial en Google Cloud Pub/Sub: publicar mensajes, crear suscripciones y consumir mensajes",
    "category": "cloud",
    "family": "nube",
    "keywords": [
      "google cloud",
      "gcp",
      "pubsub",
      "pub/sub",
      "mensajeria",
      "messaging",
      "cola",
      "queue",
      "cloud",
      "nube"
    ],
    "authModes": [
      "Cuenta de servicio (JSON)"
    ],
    "operations": [
      "pubsub.publish_message",
      "pubsub.create_subscription",
      "pubsub.consume_messages"
    ]
  },
  {
    "id": "cloud_functions",
    "repo": "Google-Cloud-Functions",
    "name": "Google Cloud Functions",
    "code": "CON-076",
    "description": "Invocación y gestión de Google Cloud Functions: invocar una función HTTP, listar funciones desplegadas y consultar el estado de despliegue",
    "category": "cloud",
    "family": "nube",
    "keywords": [
      "google cloud",
      "gcp",
      "cloud functions",
      "serverless",
      "faas",
      "cloud",
      "nube"
    ],
    "authModes": [
      "Cuenta de servicio (JSON)"
    ],
    "operations": [
      "cloud_functions.invoke",
      "cloud_functions.list_functions",
      "cloud_functions.get_status"
    ]
  },
  {
    "id": "msgraph",
    "repo": "msgraph-Robin",
    "name": "Microsoft 365 (Graph API)",
    "code": null,
    "description": "Correo, OneDrive/Excel, Teams y webhooks vía Microsoft Graph",
    "category": "productivity",
    "family": "productividad",
    "keywords": [
      "microsoft 365",
      "msgraph",
      "graph",
      "outlook",
      "onedrive",
      "teams",
      "excel",
      "sharepoint"
    ],
    "authModes": [
      "Aplicación de Azure (client credentials)"
    ],
    "operations": [
      "email.read",
      "email.send",
      "drive.read",
      "drive.write",
      "teams.message",
      "teams.meeting",
      "webhooks.subscribe"
    ]
  }
]
