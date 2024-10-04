export class BLECLIP {
  public constructor() {}

  public connectToBLE(): void {
    if (!navigator.bluetooth) {
      console.log("Bluetooth is not Available!");
    }

    navigator.bluetooth
      .requestDevice({
        acceptAllDevices: true,
        optionalServices: ["65ed019f-49f7-4267-9b56-e90c2fd4b3e5"],
      })
      .then((device) => {
        return device.gatt?.connect();
      })
      .then((server) => {
        return server?.getPrimaryService(
          "65ed019f-49f7-4267-9b56-e90c2fd4b3e5"
        );
      })
      .then((service) => {
        return service?.getCharacteristic(
          "cfdf6ed8-a098-440b-a5a7-56496868a4de"
        );
      })
      .then((characteristic) => {
        const myCharacteristic = characteristic;
        return myCharacteristic
          ?.startNotifications()
          .then((_: any) => {
            myCharacteristic.addEventListener(
              "characteristicvaluechanged",
              this.handleTagID
            );
          })
          .catch((err: any) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public handleTagID(e: any) {
    let res = "";
    for (let i = 0; i < 20; i++) {
      res += String.fromCharCode(e.target.value.getUint8(i));
    }
    console.log(`val = ${res}`);
  }
}
