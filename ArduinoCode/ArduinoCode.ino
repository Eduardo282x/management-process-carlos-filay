#include <DHT.h>
#include <DHT_U.h>

#include <WiFi.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>

//-----SENSOR PROXIMITY----
#define echoPin 12  // Pin ECHO
#define trigPin 11  // Pin TRIG

//---SENSOR DHT------
#define DHTPIN 3
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

const int PIN_MQ2_ADC = 6;

//------------LEDs-------
#define ledProximityPin 9
#define ledTempPin 18
#define ledGasPin 19

//  ------------CONFIG API--------------------
String baseURL = "https://c8q2gmjq-3000.use2.devtunnels.ms/api";
String readingURL = "/reading";
String alertURL = "/alert";

//  ------------CONFIG WIFI-------------------
const char* ssid = "Satelite";       //Nombre del Wifi
const char* password = "Nora2021.";  //Contrasena del Wifi

//-----------Estructura para guardar alertas-----------
struct Alert {
  int sensorId;
  String condition;
  float threshold;
};

Alert alerts[10];
int alertCount = 0;

//-------------------

unsigned long lastProximityOn = 0;
unsigned long lastTempOn = 0;

void setup() {
  // Configurar el monitor serial
  Serial.begin(921600);

  // Configurar pines del sensor ultrasónico
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(ledProximityPin, OUTPUT);
  pinMode(ledTempPin, OUTPUT);
  pinMode(ledGasPin, OUTPUT);


  dht.begin();
  //Configurar WiFi
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println(".");
  }
  Serial.println("Conectado a WiFi.");
}

void loop() {
  getAlertAPI();
  checkSendProximity();
  checkSendTemperature();
  checkSendGas();
  delay(1000);  // Pausa para estabilizar lecturas
}


float readProximity() {
  // Generar un pulso en el TRIG
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);  // Pausa inicial
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);  // Pulso de 10 µs
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH);
  // Calcular la distancia en cm
  return duration * 0.034 / 2;
}
int readGas() {
  int raw = analogRead(PIN_MQ2_ADC);
  return raw;
}

void getAlertAPI() {
  if (WiFi.status() == WL_CONNECTED) {

    HTTPClient http;
    http.begin(baseURL + alertURL);
    int httpGet = http.GET();

    String payload = http.getString();

    if (httpGet == 200) {
      DynamicJsonDocument alertsData(2048);
      deserializeJson(alertsData, payload);
      alertCount = 0;
      for (JsonVariant item : alertsData.as<JsonArray>()) {
        alerts[alertCount].sensorId = item["sensorId"];
        alerts[alertCount].condition = item["condition"].as<String>();
        alerts[alertCount].threshold = item["threshold"];
        alertCount++;
      }
    }

    http.end();

  } else {
    Serial.println("WiFi desconectado, reconectado...");
    WiFi.begin(ssid, password);
  }
}

void checkSendProximity() {
  float distance = readProximity();
  if (!isnan(distance)) {
    checkAlerts(1, distance);
    sendReadingAPI(1, distance, "cm");
  }
  delay(1000);
}
void checkSendGas() {
  int gases = readGas();
  if (!isnan(gases)) {
    checkAlerts(3, gases);
    sendReadingAPI(3, gases, "Pa");
  }
  delay(1000);
}

void checkSendTemperature() {
  float temperature = dht.readTemperature();
  if (!isnan(temperature)) {
    checkAlerts(2, temperature);
    sendReadingAPI(2, temperature, "C");
  }
  delay(1000);
}

void checkAlerts(int sensorId, float value) {
  for (int i = 0; i < alertCount; i++) {
    if (alerts[i].sensorId == sensorId) {
      bool conditionMet = false;

      if (alerts[i].condition == "greater" && value > alerts[i].threshold) {
        conditionMet = true;
      }

      if (alerts[i].condition == "less" && value < alerts[i].threshold) {
        conditionMet = true;
      }

      if (alerts[i].condition == "equal" && value == alerts[i].threshold) {
        conditionMet = true;
      }

      if (conditionMet) {
        if (sensorId == 1) {
          digitalWrite(ledProximityPin, HIGH);
          lastProximityOn = millis();  // Guarda el momento de encendido
        } else if (sensorId == 2) {
          digitalWrite(ledTempPin, HIGH);
          lastTempOn = millis();
        } else if (sensorId == 3) {
          digitalWrite(ledGasPin, HIGH);
          lastTempOn = millis();
        }
      } else {
        if (sensorId == 1) {
          if (millis() - lastProximityOn >= 1000) {  // Han pasado 1s desde el encendido
            digitalWrite(ledProximityPin, LOW);
          }
        } else if (sensorId == 2) {
          if (millis() - lastTempOn >= 1000) {
            digitalWrite(ledTempPin, LOW);
          }
        } else if (sensorId == 3) {
          if (millis() - lastTempOn >= 1000) {
            digitalWrite(ledGasPin, LOW);
          }
        }
      }
    }
  }
}

void sendReadingAPI(int sensorId, float value, const char* unit) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    http.begin(baseURL + readingURL);
    http.addHeader("Content-Type", "application/json");

    JsonDocument jsonDoc;
    jsonDoc["sensorId"] = sensorId;
    jsonDoc["value"] = value;
    jsonDoc["unit"] = unit;

    String jsonData;
    serializeJson(jsonDoc, jsonData);

    int httpResponse = http.POST(jsonData);

    http.end();

  } else {
    Serial.println("WiFi desconectado, reconectado...");
    WiFi.begin(ssid, password);
  }
}
