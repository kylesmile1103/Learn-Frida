# Learn how to use Frida with Unity app

This tutorial will help you understand quickly and easily how to mod Unity apps and games with Frida.

## Introduction

According to Frida document, Frida is [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) for native apps, or, put in more technical terms, it’s a dynamic code instrumentation toolkit. It lets you inject snippets of JavaScript or your own library into native apps on Windows, macOS, GNU/Linux, iOS, Android, and QNX. [Learn more](https://frida.re/docs/home/)

### Explanation

"Frida" means "Free IDA", where Frida could be Ida’s sister, as IDA is a _static analysis_ tool and Frida is a _dynamic analysis_ toolkit.

It lets you inject snippets of JavaScript into native apps on Windows, Mac, Linux, iOS and Android. Frida also provides you with some simple tools built on top of the Frida API.

In other words, it allows you to inject your own code and to programmatically and interactively inspect and change running processes. Frida doesn’t need access to source code and can be used on iOS and Android devices that aren’t jailbroken or rooted. It lets you do all of this through APIs available from Objective-C, which are also exposed to higher-level languages through bindings.

### Why is Frida?

As far as I know, Frida is a framework designed for _developers, reverse-engineers, and security researchers to monitor and debug running processes. It also enables programmers, software and security professionals to execute their own JS scripts into other processes._

Game/App Modding might not meet the purpose on how Frida is made for, but due to its wonderful features, such as live debugging; powerfull instrumentation kit; simple syntax, simple setup that help beginers easier to implement and learn, etc. It can be a perfect method for modding if we understand the Frida's fundamental, so let's start!

## Getting ready

### Frida-tools

First, we would need to install Frida-tools on Windows/Mac/Linux in order to use the CLI.

#### Requirement

* Python, Python3
* Pip, Pip3

#### Install with Pip

> pip install frida-tools

#### Testing via cmd/terminal

Open cmd/powershell or terminal and type:

> frida-ps

This will list all the [running processes](https://frida.re/docs/frida-ps/) of our current OS.

### Install Frida-server

To communicate with Frida-tools from client-side, let's install Frida-server on whichever device we want to analyze. In this case, it's a Android device.

#### Requirement

* Rooted device
* ADB is enabled and authorized

First off, download the latest frida-server from the [releases](https://github.com/frida/frida/releases) page and uncompress it.

In this tutorial, we will be doing it on Android device that has arm64-v8a ABI, so we need to find and download `frida-server-xx.xx.xx-android-arm64.xz`. After uncompressing, we should rename the file to `frida-server` and push to `data/local/tmp`

#### Install the server manually via ADB

Let's install and start the server by following this [Frida document](https://frida.re/docs/android/)

> adb push frida-server /data/local/tmp/

> adb shell

> su

> chmod 755 /data/local/tmp/frida-server

> /data/local/tmp/frida-server &

#### Install the server via MagiskFrida module or Frida server app

The process of installing and updating Frida server could be done automatically by a Magisk module or an Android app published on Google Play.

* With Magisk module, just open [Magisk](https://github.com/topjohnwu/Magisk/releases) app, go to Download tab, find and install the [MagiskFrida](https://github.com/AeonLucid/MagiskFrida) module then restart the device. This method is highly recommended since `MagiskFrida` is continuously developing, the server itself is automatically started every time the device boots and also get updated whenever there's a new version released. 

* With [Frida server](https://play.google.com/store/apps/details?id=me.shingle.fridaserver) app by `shingle`, find it on Google Play with packageID `me.shingle.fridaserver`. After `su` granted, we can now download and start the Frida-server easily.

#### Testing via cmd/terminal

Open cmd/powershell or terminal and type:

> frida-ps -U

This `-U` option means USB or remote device, so that we should see the processes of our Android device.

## Mod our first Unity app

This tutorial comes with a sample Unity app that designed for learning Frida, so let's begin by downloading the [apk file](https://github.com/kylesmile1103/Learn-Frida/raw/master/gameLearn.apk).

### Hook the script to desired app

First, let's create a Javascript file and write down this simple code:

```javascript
console.log("Hello World!")
```

After that, we need to make Frida listen to our app by inputting its packageID, then use `-l` to hook the custom Javascript file, see this cmd:

> frida -U <com.company.someapp> -l <some-script.js>

If the cmd above executes successfully, we will see console output `Hello World!` string.
  
To spawn the app then listen to it right away, which is very helpful for early instrumentation, use `-f`

> frida -U -f <com.company.someapp> -l <some-script.js>
  
While spawning, Frida will pause the app for early instrumentation purpose, so we need `%resume` to resume it. Or we can do it automatically by adding `--no-pause` at the end of cmd, also use `-Uf` for brevity.

> frida -Uf <com.company.someapp> -l <some-script.js> --no-pause

**Note:**

* Early instrumentation will need an async await wrapper, because the module (libil2cpp.so) might not be able to load before the script's executing. See the code below:

```javascript
function awaitForCondition(callback) {
    var i = setInterval(function () {
      var addr = Module.findBaseAddress('libil2cpp.so');
        console.log("Address found:", addr);
        if (addr) {
            clearInterval(i);
            callback(+addr);
        }
    }, 0);
}

var il2cpp = null;

Java.perform(function () {
    awaitForCondition(function (base) {
        il2cpp = base;
  // do something
    })
})
```

* The `-l <some-script.js>` is optional, Frida CLI is a [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) interface so we just need to paste the whole script into cmd line to execute it, but that is not ideally for large amount of codes. 

### Write the first script

Learning Frida script is not difficult since it supports Javascript API and others high-level programming language. Let's take a look at Javascript API [document](https://frida.re/docs/javascript-api/).

Clone [this repo](https://github.com/oleavr/frida-agent-example), `npm install` then create new `.js` file inside of project folder so we can get code completion, type checking, inline docs, refactoring tools, etc.

Here're some features that we're gonna mainly focus on for modding Unity app:

1. **[Module](https://frida.re/docs/javascript-api/#module)**
  * findBaseAdrress(`lib name`)
  * load(`path`)
  
2. **[Interceptor](https://frida.re/docs/javascript-api/#interceptor)**
  * attach(`address`, `callback`)
  * replace(`adress`, `callback`)
  
3. **[NativePointer](https://frida.re/docs/javascript-api/#nativepointer)**(`offset | decimal`)
  * readInt() | readFloat() | readutf16String() | readByteArray(`decimal`) | readPointer()
  * writeInt(`decimal`) | writeFloat(`decimal`) | writeUtf16String(`'some string'`) | writeByteArray(`hex`) | writePointer(`ptr`)
  
4. **[NativeFunction](https://frida.re/docs/javascript-api/#nativefunction)**(`address`, `return type`, `[array of argument]`)

5. **[Memory](https://frida.re/docs/javascript-api/#memory)**
  * scan(`base address`, `size`, `pattern`, `callback`)
 
6. **[Process](https://frida.re/docs/javascript-api/#process)**
  * enumerateRanges(`protection | specifier`)
  
View the sample script in this repo and follow the tutorial video for better understanding how to implement these method to our sample app.

### Finish and build modded apk

To complete our modding process, we need to patch the script to apk file so that it can run independently without a computer. Frida's gadget enables us to achieve such purpose, read this [article](https://lief.quarkslab.com/doc/latest/tutorials/09_frida_lief.html#id9) to do it manually, we can also implememnt it by using [Objection](https://github.com/sensepost/objection), and this is the method we're gonna use.

Looking into Objection wiki, find the [Gadget-Configuration](https://github.com/sensepost/objection/wiki/Gadget-Configurations) segment, there will be detail guides on how to patch apk or ipa file with Frida gadget, the best part is the whole process can be done automatically.

#### Install Objection

We can install Objection via python just like Frida:

> pip3 install objection

Objection can do a lot of interesting things like enumerate Module, hooking class, hooking method, etc. But we're not gonna talk about it here, read its [wiki](https://github.com/sensepost/objection/wiki) for more detail.

#### Requirement

We will need to prepare 3 files:

* The original apk file
* Configuration file for gadget
* Final Javascript file contains our script

The configuration file should be formated as JSON file and looked like this:

```json
{
  "interaction": {
    "type": "script",
    "path": "libfrida-gadget.script.so",
    "on_load": "resume"
  }
}
```

#### Patch the apk

Open cmd/terminal, run the following cmd:

> objection patchapk -s <some-apk.apk> -c <config.json> -l <some-script.js>

Where:

* `patchapk` uses for patching apk, for iOS use `patchipa`

* `-s` is source apk or ipa file

* `-c` input the configuration file

* `-l` input the final script file

* `--architecture` is optional if we don't have our device connected to ADB. Input the desired ABI, e.g. `arm64-v8a` | `armeabi-v7a` | `X86`,...

The patching process will take some time depends on the size of apk or ipa file. Once it finished, we will have the modded apk ready to be installed.

## Frida with non-rooted devices

If our Android device can not be rooted, we still can use Frida normally. All we need is embedding the Frida's gadget library into the apk, and of course, this process can be done automatically by Objection.

#### Requirement

This time, we will only need to prepare 2 files:

* The original apk file
* Configuration file for gadget

The configuration file should be formated as JSON file and looked like this:

```json
{
  "interaction": {
    "type": "listen",
    "address": "127.0.0.1",
    "port": 27042,
    "on_load": "resume"
  }
}
```

#### Patch the apk

Open cmd/terminal, run the following cmd:

> objection patchapk -s <some-apk.apk> -c <config.json>

Where:

* `patchapk` uses for patching apk, for iOS use `patchipa`

* `-s` is source apk or ipa file

* `-c` input the configuration file

* `--architecture` is optional if we don't have our device connected to ADB. Input the desired ABI, e.g. `arm64-v8a` | `armeabi-v7a` | `X86`,...

The patching gadget-only process now will take fewer time than patching with script. Once it finished, we will have the patched apk ready to be used with Frida, but instead of input the packageID, we need to input `gadget` for Frida to understand, since it can't read the process list on non-rooted devices.

> frida -U gadget -l <some-script.js>

**Note:**

* The drawback of this technique is we can't spawn apk with `-f`, but we can do it with adb

> adb shell monkey -p <com.company.someapp> 1; frida -U gadget -l <some-script.js>

That it, good luck and have fun!

**Reference:**

* Frida: https://frida.re/

* How to use frida on a non-rooted device: https://lief.quarkslab.com/doc/latest/tutorials/09_frida_lief.html#id9

* Objection: https://github.com/sensepost/objection

* Dynamic Instrumentation Toolkit – Frida: https://www.cyberpunk.rs/dynamic-instrumentation-toolkit-frida

* MagiskFrida: https://github.com/AeonLucid/MagiskFrida

* Frida server: https://play.google.com/store/apps/details?id=me.shingle.fridaserver
