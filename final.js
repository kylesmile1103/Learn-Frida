const Start = '0x00667D80';
const ShowResult = '0x00667F14';
const ChangeA = '0x006684E8';
const changeB = '0x00668518';
const ChangeStr = '0x00668558';
const ChangeC = '0x006685EC';
const ChangeAr = '0x00668620';
const changeListInt = '0x0066869C';
const ChaneListStr = '0x00668738';
const GetIntA = '0x00668834';
const GetBoolB = '0x006688E8';
const GetStringStr = '0x0066898C';
const GetFloatC = '0x00668A1C';
const GetArrayInt = '0x00668AD8';
const ChangeValueStaticIntA = '0x00668BA0';
const changeValueStringStatic = '0x00668C34';
const GetListInt = '0x00668D00';
const GetListStr = '0x00668D78';
const ShowResultMethod = '0x00668DF0';

function awaitForCondition(callback) {
    var i = setInterval(function () {
        var addr = Module.findBaseAddress('libil2cpp.so');
        //// console.log("Address found:", addr);
        if (addr) {
            clearInterval(i);
            callback(+addr);
        }
    }, 0);
}

var il2cpp = null;

Java.perform(function () {
    awaitForCondition(function (base) {
        il2cpp = ptr(base);
        makeToast('Modded by KyleSmile')
        readFieldInt(345)
        readFieldBool() // always true
        readFieldString('so very awesome')
        readFieldFloat(145.214)
        readFieldArray(11, 11, 11)
        readFieldList(12, 361, 352)
        readFieldListStr('ha', 'hi', 'hu')
        readFieldStaticInt(99)
        readFieldStaticStr('yeah 999')
    })
})


function readFieldInt(int) {
    Interceptor.attach(il2cpp.add(ChangeA), {
        onEnter: function (args) {
            // console.log("ShowResult is calling");
            this.instance = args[0]

            var a = this.instance.add(0x18)

            // console.log("value of a = ", a.readInt());
            //// console.log(a.readByteArray(100));
            a.writeInt(int)
        }
    })
}



function readFieldBool() {
    Interceptor.attach(il2cpp.add(changeB), {
        onEnter: function (args) {
            // console.log("ShowResult is calling");
            this.instance = args[0]

            var b = this.instance.add(0x1C)

            // console.log("value of b = ", b.readInt());
            //// console.log(b.readByteArray(100));
            b.writeInt(1) // always true
        }
    })
}

function readFieldString(strNew) {
    Interceptor.attach(il2cpp.add(ChangeStr), {
        onEnter: function (args) {
            // console.log("ShowResult is calling");
            this.instance = args[0]

            var str = this.instance.add(0x20).readPointer().add(0x14)

            // console.log("value of string = ", str.readUtf16String());
            //// console.log(str.readByteArray(100));
            str.writeUtf16String(strNew)
        }
    })
}

function readFieldFloat(float) {
    Interceptor.attach(il2cpp.add(ChangeC), {
        onEnter: function (args) {
            // console.log("ShowResult is calling");
            this.instance = args[0]

            var c = this.instance.add(0x28)

            // console.log("value of float = ", c.readFloat());
            //// console.log(c.readByteArray(100));
            c.writeFloat(float)
        }
    })
}

function readFieldArray(int1, int2, int3) {
    Interceptor.attach(il2cpp.add(ChangeAr), {
        onEnter: function (args) {
            // console.log("ShowResult is calling");
            this.instance = args[0]

            var ar = this.instance.add(0x30).readPointer()

            //// console.log(ar.readByteArray(100));

            // console.log("array length:", ar.add(0x18).readInt());
            // console.log("array 0:", ar.add(0x20).readInt());
            // console.log("array 1:", ar.add(0x24).readInt());
            // console.log("array 2:", ar.add(0x28).readInt());

            ar.add(0x20).writeInt(int1)
            ar.add(0x24).writeInt(int2)
            ar.add(0x28).writeInt(int3)
            //c.writeFloat(45.4647)
        }
    })
}

function readFieldList(int1, int2, int3) {
    Interceptor.attach(il2cpp.add(changeListInt), {
        onEnter: function (args) {
            // console.log("ShowResult is calling");
            this.instance = args[0]

            var listInt = this.instance.add(0x38).readPointer().add(0x10).readPointer()

            //// console.log(listInt.readByteArray(100));

            // // console.log("array length:", ar.add(0x18).readInt());
            // console.log("array 0:", listInt.add(0x20).readInt());
            // console.log("array 1:", listInt.add(0x24).readInt());
            // console.log("array 2:", listInt.add(0x28).readInt());

            listInt.add(0x20).writeInt(int1)
            listInt.add(0x24).writeInt(int2)
            listInt.add(0x28).writeInt(int3)
        }
    })
}

function readFieldListStr(str1, str2, str3) {
    Interceptor.attach(il2cpp.add(ChaneListStr), {
        onEnter: function (args) {
            // console.log("ShowResult is calling");
            this.instance = args[0]

            var listStr = this.instance.add(0x40).readPointer().add(0x10).readPointer()

            //// console.log(listStr.readByteArray(100));

            // // console.log("array length:", ar.add(0x18).readInt());
            // console.log("array 0:", listStr.add(0x20).readPointer().add(0x14).readUtf16String());
            // console.log("array 1:", listStr.add(0x28).readPointer().add(0x14).readUtf16String());
            // console.log("array 2:", listStr.add(0x30).readPointer().add(0x14).readUtf16String());

            listStr.add(0x20).readPointer().add(0x14).writeUtf16String(str1)
            listStr.add(0x28).readPointer().add(0x14).writeUtf16String(str2)
            listStr.add(0x30).readPointer().add(0x14).writeUtf16String(str3)
        }
    })
}

function readFieldStaticInt(int) {
    Interceptor.attach(il2cpp.add(ChangeValueStaticIntA), {
        onEnter: function (args) {
            // console.log("ShowResult is calling");
            this.instance = args[0] // is it useless?

            var UnityElement = this.instance.add(0x48)

            //// console.log(UnityElement.readByteArray(100));            

            var range = Process.findRangeByAddress(UnityElement)

            // // console.log(JSON.stringify(range));
            // var pattern = ptr(64).toMatchPattern().replace(" 00 00 00 00", "")

            // memScan(range, pattern)


            // var staticInt = ptr(0x7888a39c30); //yay
            // var offset = staticInt.sub(range.base)
            // // console.log(offset);

            var staIntField = range.base.add(0x2c30)
            staIntField.writeInt(int)
            // console.log("static int:", staIntField.readInt());
        }
    })
}

function readFieldStaticStr(str) {
    Interceptor.attach(il2cpp.add(changeValueStringStatic), {
        onEnter: function (args) {
            // console.log("ShowResult is calling");
            this.instance = args[0] // is it useless?

            var UnityElement = this.instance.add(0x48)

            var range = Process.findRangeByAddress(UnityElement)

            var staStrField = range.base.add(0x2c30).add(0x08).readPointer().add(0x14)
            staStrField.writeUtf16String(str)
            // console.log("static str:", staStrField.readUtf16String());
        }
    })
}

function makeToast(string) {
    Java.perform(function () {
        var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();

        Java.scheduleOnMainThread(function () {
            var toast = Java.use("android.widget.Toast");
            toast.makeText(Java.use("android.app.ActivityThread").currentApplication().getApplicationContext(), Java.use("java.lang.String").$new(string), 1).show();
        });
    });
}


// function memScan(m, pattern) {
//     Memory.scan(m.base, m.size, pattern, {
//         onMatch: function (address, size) {
//             console.log('Memory.scan() found match at', address,
//                 'with size', size);

//             Optionally stop scanning early:
//             return 'stop';
//         },
//         onComplete: function () {
//             console.log('Memory.scan() complete');
//         }
//     });
// }