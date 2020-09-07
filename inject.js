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
        //console.log("Address found:", addr);
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

        readFieldInt()
        //readFieldBool()
        //readFieldString()
        //readFieldFloat()
        //readFieldArray()
        //readFieldList()
        //readFieldListStr()
        //readFieldStaticInt()
        //readFieldStaticStr()
    })
})



function readFieldInt() {
    Interceptor.attach(il2cpp.add(ShowResult), {
        onEnter: function (args) {
            console.log("ShowResult is calling");
            this.instance = args[0]

            var a = this.instance.add(0x18)

            console.log("value of a = ", a.readInt());
            //console.log(a.readByteArray(100));
            a.writeInt(999)
        }
    })
}



function readFieldBool() {
    Interceptor.attach(il2cpp.add(ShowResult), {
        onEnter: function (args) {
            console.log("ShowResult is calling");
            this.instance = args[0]

            var b = this.instance.add(0x1C)

            console.log("value of b = ", b.readInt());
            //console.log(b.readByteArray(100));
            b.writeInt(1) // always true
        }
    })
}

function readFieldString() {
    Interceptor.attach(il2cpp.add(ShowResult), {
        onEnter: function (args) {
            console.log("ShowResult is calling");
            this.instance = args[0]

            var str = this.instance.add(0x20).readPointer().add(0x14)

            console.log("value of string = ", str.readUtf16String());
            //console.log(str.readByteArray(100));
            str.writeUtf16String('so very awesome')
        }
    })
}

function readFieldFloat() {
    Interceptor.attach(il2cpp.add(ShowResult), {
        onEnter: function (args) {
            console.log("ShowResult is calling");
            this.instance = args[0]

            var c = this.instance.add(0x28)

            console.log("value of float = ", c.readFloat());
            //console.log(c.readByteArray(100));
            c.writeFloat(45.4647)
        }
    })
}

function readFieldArray() {
    Interceptor.attach(il2cpp.add(ShowResult), {
        onEnter: function (args) {
            console.log("ShowResult is calling");
            this.instance = args[0]

            var ar = this.instance.add(0x30).readPointer()

            //console.log(ar.readByteArray(100));

            console.log("array length:", ar.add(0x18).readInt());
            console.log("array 0:", ar.add(0x20).readInt());
            console.log("array 1:", ar.add(0x24).readInt());
            console.log("array 2:", ar.add(0x28).readInt());

            ar.add(0x20).writeInt(55)
            ar.add(0x24).writeInt(55)
            ar.add(0x28).writeInt(55)
            //c.writeFloat(45.4647)
        }
    })
}

function readFieldList() {
    Interceptor.attach(il2cpp.add(ShowResult), {
        onEnter: function (args) {
            console.log("ShowResult is calling");
            this.instance = args[0]

            var listInt = this.instance.add(0x38).readPointer().add(0x10).readPointer()

            //console.log(listInt.readByteArray(100));

            // console.log("array length:", ar.add(0x18).readInt());
            console.log("array 0:", listInt.add(0x20).readInt());
            console.log("array 1:", listInt.add(0x24).readInt());
            console.log("array 2:", listInt.add(0x28).readInt());

            listInt.add(0x20).writeInt(55)
            listInt.add(0x24).writeInt(55)
            listInt.add(0x28).writeInt(55)
        }
    })
}

function readFieldListStr() {
    Interceptor.attach(il2cpp.add(ShowResult), {
        onEnter: function (args) {
            console.log("ShowResult is calling");
            this.instance = args[0]

            var listStr = this.instance.add(0x40).readPointer().add(0x10).readPointer()

            //console.log(listStr.readByteArray(100));

            // console.log("array length:", ar.add(0x18).readInt());
            console.log("array 0:", listStr.add(0x20).readPointer().add(0x14).readUtf16String());
            console.log("array 1:", listStr.add(0x28).readPointer().add(0x14).readUtf16String());
            console.log("array 2:", listStr.add(0x30).readPointer().add(0x14).readUtf16String());

            listStr.add(0x20).readPointer().add(0x14).writeUtf16String('ok')
            listStr.add(0x28).readPointer().add(0x14).writeUtf16String('hi')
            listStr.add(0x30).readPointer().add(0x14).writeUtf16String('so')
        }
    })
}

function readFieldStaticInt() {
    Interceptor.attach(il2cpp.add(ShowResult), {
        onEnter: function (args) {
            console.log("ShowResult is calling");
            this.instance = args[0] // is it useless?

            var UnityElement = this.instance.add(0x48)

            //console.log(UnityElement.readByteArray(100));            

            var range = Process.findRangeByAddress(UnityElement)

            // console.log(JSON.stringify(range));
            // var pattern = ptr(64).toMatchPattern().replace(" 00 00 00 00", "")

            // memScan(range, pattern)


            // var staticInt = ptr(0x7888a39c30); //yay
            // var offset = staticInt.sub(range.base)
            // console.log(offset);

            var staIntField = range.base.add(0x2c30)
            staIntField.writeInt(1000)
            console.log("static int:", staIntField.readInt());
        }
    })
}

function readFieldStaticStr() {
    Interceptor.attach(il2cpp.add(ShowResult), {
        onEnter: function (args) {
            console.log("ShowResult is calling");
            this.instance = args[0] // is it useless?

            var UnityElement = this.instance.add(0x48)

            var range = Process.findRangeByAddress(UnityElement)

            var staStrField = range.base.add(0x2c30).add(0x08).readPointer().add(0x14)
            staStrField.writeUtf16String('hurray 111')
            console.log("static str:", staStrField.readUtf16String());
        }
    })
}


function memScan(m, pattern) {
    Memory.scan(m.base, m.size, pattern, {
        onMatch: function (address, size) {
            console.log('Memory.scan() found match at', address,
                'with size', size);

            // Optionally stop scanning early:
            return 'stop';
        },
        onComplete: function () {
            console.log('Memory.scan() complete');
        }
    });
}