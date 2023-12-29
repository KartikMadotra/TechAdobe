// Arduino Code for Relays

#define relayone 3
#define relaytwo 4
#define relaythree 5
#define relayfour 6
#define relayfive 7
#define relaysix 8
#define relayseven 9
#define relayeight 10
#define laser 2


void setup() {
  Serial.begin(115200);
  pinMode(relayone, OUTPUT);
  pinMode(relaytwo, OUTPUT); 
  pinMode(relaythree, OUTPUT);
  pinMode(relayfour, OUTPUT);
  pinMode(relayfive, OUTPUT);
  pinMode(relaysix, OUTPUT);
  pinMode(relayseven, OUTPUT);
  pinMode(relayeight, OUTPUT);
  pinMode(laser,OUTPUT);
}

void loop() {
  if (Serial.available() > 0) {
    int data = Serial.parseInt();
    Serial.print(data);

    switch (data) {
      case 1:
        digitalWrite(relayone, HIGH);
        Serial.println("Relay 1 HIGH");
        break;
      case 11:
        digitalWrite(relayone, LOW);
        Serial.println("Relay 1 LOW");
        break;
        case 2:
        digitalWrite(relaytwo, HIGH);
        Serial.println("Relay 2 HIGH");
        break;
      case 22:
        digitalWrite(relaytwo, LOW);
        Serial.println("Relay 2 LOW");
        break;
        case 3:
        digitalWrite(relaythree, HIGH);
        Serial.println("Relay 3 HIGH");
        break;
      case 33:
        digitalWrite(relaythree, LOW);
        Serial.println("Relay 3 LOW");
        break;
        case 4:
        digitalWrite(relayfour, HIGH);
        Serial.println("Relay 4 HIGH");
        break;
      case 44:
        digitalWrite(relayfour, LOW);
        Serial.println("Relay 4 LOW");
        break;
        case 5:
        digitalWrite(relayfive, HIGH);
        Serial.println("Relay 5 HIGH");
        break;
      case 55:
        digitalWrite(relayfive, LOW);
        Serial.println("Relay 5 LOW");
        break;
        case 6:
        digitalWrite(relaysix, HIGH);
        Serial.println("Relay 6 HIGH");
        break;
      case 66:
        digitalWrite(relaysix, LOW);
        Serial.println("Relay 6 LOW");
        break;
        case 7:
        digitalWrite(relayseven, HIGH);
        Serial.println("Relay 7 HIGH");
        break;
      case 77:
        digitalWrite(relayseven, LOW);
        Serial.println("Relay 7 LOW");
        break;
        case 8:
        digitalWrite(relayeight, HIGH);
        Serial.println("Relay 8 HIGH");
        break;
       case 88:
        digitalWrite(relayeight, LOW);
        Serial.println("Relay 8 LOW");
        break;
        case 99:
        digitalWrite(laser , HIGH);
        break;
        case 9:
        digitalWrite(laser,LOW);
        break;
      default:
        // Handle unexpected values if needed
//        //Serial.println("Unexpected INPUT / OUTPUT");
        break;
    }
  }
}
