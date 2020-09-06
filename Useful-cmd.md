- Read field:

```
           var val1 = this.instance.add('0x10')
           console.log("Val 1: " + val1.readInt());
```
- Read string:  

```
             var str= this.instance.add(offset).readPointer().add(0x14)
             console.log("Show string:", str.readUtf16String());
```
- Read array: 

```
            var arr=this.instance.add('0x20').readPointer();

            console.log("length: ", arr.add('0x18').readInt())
            console.log(arr.add('0x20').readInt())
            console.log(arr.add('0x24').readInt())
            console.log(arr.add('0x28').readInt())

```
- Write string:

```
            var strings = this.instance.add('0x30').readPointer().add('0x14');
            strings.writeUtf16String('hahaha')
```
- Replace function return string:

```
            ret_val.add('0x14').writeUtf16String('123123');
            return ret_val;
```
