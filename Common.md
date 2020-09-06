- Read field:

```
           var val1 = this.instance.add(offset)
           console.log("Val 1: " + val1.readInt());
```
- Read string:  

```
             var str= this.instance.add(offset).readPointer().add(0x14)
             console.log("Show string:", str.readUtf16String());
```
- Read array: 

```
            var arr=this.instance.add(offset).readPointer();

            console.log("length: ", arr.add('0x18').readInt())
            console.log("val1=",arr.add('0x20').readInt())
            console.log("val2=",arr.add('0x24').readInt())
            console.log("val3=",arr.add('0x28').readInt())

```

- Read List<>:

```
           var list = this.instance.add(offset).readPointer().add(0x10).readPointer();
           
```
- Write string:

```
            var strings = this.instance.add(offset).readPointer().add('0x14');
            strings.writeUtf16String('hahaha')
```
- Replace string in function return:

```
            ret_val.add('0x14').writeUtf16String('123123');
            return ret_val;
```
- Make Toast

```
function makeToast(string) {
  Java.perform(function () {
    var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();

    Java.scheduleOnMainThread(function () {
      var toast = Java.use("android.widget.Toast");
      toast.makeText(Java.use("android.app.ActivityThread").currentApplication().getApplicationContext(), Java.use("java.lang.String").$new(string), 1).show();
    });
  });
}
```

- Find Static Field:

```
var addr;
var scanAddr = function (val) {
    addr = val;
}

var getStaticOffset = function (range, val) {
    var pattern = ptr(val).toMatchPattern().replace("00 00 00 00", "");

    Memory.scan(range.base, range.size, pattern, {
        onMatch: function (address, size) {
            //console.log('Memory.scan() found match at', address,'with size', size);
            scanAddr(address);
            // Optionally stop scanning early:
            //return 'stop';
        },
        onComplete: function () {}
    });
    //addr = ptr(0x73d8c246d0);
    var offset = addr.sub(range.base);
    //console.log('offset=', offset);
    return offset;
}
```
