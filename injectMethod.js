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

var count = 0;
var il2cpp = null;

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

Java.perform(function () {
    awaitForCondition(function (base) {
        il2cpp = ptr(base);
        tamperGetIntA()
        // tamperGetArrayInt()
        //tamperGetStringStr()
        //callChangeA()
        replaceChangeC()
        makeToast('Modded by somebody')
    })
})

function tamperGetIntA() {
    Interceptor.attach(il2cpp.add(GetIntA), {
        onEnter: function (args) {
            console.log("getIntA is calling");
            //args[1] = ptr(-999)
            this.val = args[1] //int val
            this.instance = args[0]

            console.log('value argument:', this.val.toInt32());

        },
        onLeave: function (ret_val) {
            console.log('getIntA was called');
            //console.log(this.val.toInt32());
            console.log('return value:', ret_val.toInt32()); // real value going to be returned
            //ret_val.replace(-9)

            return ret_val;
        }
    })
}

function tamperGetArrayInt() {
    Interceptor.attach(il2cpp.add(GetArrayInt), {
        onEnter: function (args) {
            console.log("GetArrayInt is calling");

            var ar = args[1]

            console.log(ar.readByteArray(100));

            console.log("array length:", ar.add(0x18).readInt());
            console.log("array 0:", ar.add(0x20).readInt());
            console.log("array 1:", ar.add(0x24).readInt());
            console.log("array 2:", ar.add(0x28).readInt());

            ar.add(0x20).writeInt(99)
            ar.add(0x24).writeInt(99)
            ar.add(0x28).writeInt(99)
        },
        onLeave: function (ret_val) {
            console.log('GetArrayInt was called');

            var ar = ret_val

            //console.log(ar.readByteArray(100));

            console.log("array length:", ar.add(0x18).readInt());
            console.log("array 0:", ar.add(0x20).readInt());
            console.log("array 1:", ar.add(0x24).readInt());
            console.log("array 2:", ar.add(0x28).readInt());


            ar.add(0x20).writeInt(11)
            ar.add(0x24).writeInt(11)
            ar.add(0x28).writeInt(111)

            //return ret_val;
        }
    })
}


function tamperGetStringStr() {
    Interceptor.attach(il2cpp.add(GetStringStr), {
        onEnter: function (args) {
            console.log("GetStringStr is calling");
            this.val = args[1] //int val
            count++;


        },
        onLeave: function (ret_val) {

            switch (count) {
                case 1:
                    console.log('value str:', ret_val.add(0x14).readUtf16String());
                    ret_val.add(0x14).writeUtf16String('see you again')
                    break;
                case 2:
                    console.log('value static str:', ret_val.add(0x14).readUtf16String());
                    ret_val.add(0x14).writeUtf16String('!!!')
                    count = 0;
                    break;

                default:
                    break;
            }
            return ret_val;
        }
    })
}

function tamperGetStringStr() {
    Interceptor.attach(il2cpp.add(GetStringStr), {
        onEnter: function (args) {
            console.log("GetStringStr is calling");
            this.val = args[1] //int val
            count++;


        },
        onLeave: function (ret_val) {

            switch (count) {
                case 1:
                    console.log('value str:', ret_val.add(0x14).readUtf16String());
                    ret_val.add(0x14).writeUtf16String('see you again')
                    break;
                case 2:
                    console.log('value static str:', ret_val.add(0x14).readUtf16String());
                    ret_val.add(0x14).writeUtf16String('!!!')
                    count = 0;
                    break;

                default:
                    break;
            }
            return ret_val;
        }
    })
}


function callChangeA() {
    Interceptor.attach(il2cpp.add(ShowResult), {
        onEnter: function (args) {
            this.instance = args[0]
            new NativeFunction(il2cpp.add(ChangeA), 'void', ['pointer'])(this.instance);
        }
    })
}

function replaceChangeC() {
    Interceptor.replace(il2cpp.add(ChangeC), new NativeCallback(function (instance) {
        console.log('ChangeC is now ChangeA');
        new NativeFunction(il2cpp.add(ChangeA), 'void', ['pointer'])(instance);
    }, 'void', ['pointer']));
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
