export class BLECLIP {
  private writeDatatoCLIP?: BluetoothRemoteGATTCharacteristic;
  private isREQDatatoCLIP: boolean;
  private clipIMEI: string = "KOSONG";

  private serviceUID: BluetoothServiceUUID =
    "65ed019f-49f7-4267-9b56-e90c2fd4b3e5";
  private characteristicUID: BluetoothCharacteristicUUID =
    "cfdf6ed8-a098-440b-a5a7-56496868a4de";

  public constructor() {
    this.isREQDatatoCLIP = false;
  }

  public connectToBLE(): void {
    if (!navigator.bluetooth) {
      console.log("Bluetooth is not Available!");
    }

    navigator.bluetooth
      .requestDevice({
        acceptAllDevices: true,
        optionalServices: [this.serviceUID],
      })
      .then((device) => {
        return device.gatt?.connect();
      })
      .then((server) => {
        return server?.getPrimaryService(this.serviceUID);
      })
      .then((service) => {
        return service?.getCharacteristic(this.characteristicUID);
      })
      .then((characteristic) => {
        this.writeDatatoCLIP = characteristic;
        this.isREQDatatoCLIP = true;
        console.log("ok");
        const myCharacteristic = characteristic;
        return myCharacteristic
          ?.startNotifications()
          .then((_: any) => {
            myCharacteristic.addEventListener(
              "characteristicvaluechanged",
              this.responseFromBLE
            );
          })
          .catch((err: any) => {
            console.log(err);
          });
      })
      .then((_: any) => {
        this.requestToBLE("OPEN");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public requestToBLE(msg: string): void {
    if (!this.isREQDatatoCLIP) {
      return;
    }
    const arr = msg.split("#");
    switch (arr[0]) {
      case "OPEN":
        this.writeToBLE(msg);
        break;
      case "CLOSE":
        this.writeToBLE(msg);
        break;
      case "WRITE":
        this.writeToBLE(msg);
        break;
      default:
        break;
    }
  }

  public writeToBLE(msg: string): void {
    const encoder = new TextEncoder();
    this.writeDatatoCLIP
      ?.writeValue(encoder.encode(msg))
      .then((_: any) => {
        console.log(msg);
        console.log("Dikirim");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  private responseFromBLE(e: any): any {
    const res = e.target.value;
    const decode = new TextDecoder();
    const resDecode = decode.decode(res);
    const arr = resDecode.split("#");
    switch (arr[0]) {
      case "OPEN":
        this.clipIMEI = arr[1];
        console.log(`clip IMEI = ${this.clipIMEI}`);
        break;
      default:
        console.log(res);
        break;
    }
    return resDecode;
  }

  public getIMEI() {
    return this.clipIMEI;
  }
}
