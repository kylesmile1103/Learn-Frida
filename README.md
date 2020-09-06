# Learn how to use Frida with Unity app

This tutorial will help you understand quickly and easily how to mod Unity games with Frida.

## Introduction

According to Frida document, Frida is [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) for native apps, or, put in more technical terms, it’s a dynamic code instrumentation toolkit. It lets you inject snippets of JavaScript or your own library into native apps on Windows, macOS, GNU/Linux, iOS, Android, and QNX. [Learn more](https://frida.re/docs/home/)

### Explanation

"Frida" means "Free IDA", where Frida could be Ida’s sister, as IDA is a _static analysis_ tool and Frida is a _dynamic analysis_ toolkit.

It lets you inject snippets of JavaScript into native apps on Windows, Mac, Linux, iOS and Android. Frida also provides you with some simple tools built on top of the Frida API.

In other words, it allows you to inject your own code and to programmatically and interactively inspect and change running processes. Frida doesn’t need access to source code and can be used on iOS and Android devices that aren’t jailbroken or rooted. It lets you do all of this through APIs available from Objective-C, which are also exposed to higher-level languages through bindings.

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

* With Magisk module, just open [Magisk](https://github.com/topjohnwu/Magisk/releases) app, go to Download tab, find and install the `MagiskFrida` module then restart the device. This method is highly recommended since MagiskFrida is continuously developing, the server itself is automatically started every time the device boots and also get updated whenever there's a new version released. 

* With [Frida server](https://play.google.com/store/apps/details?id=me.shingle.fridaserver) app by `shingle`, find it on Google Play with packageID `me.shingle.fridaserver`. After `su` granted, we can now download and start the Frida-server easily.

#### Testing via cmd/terminal

Open cmd/powershell or terminal and type:

> frida-ps -U

This `-U` option means USB or remote device, so that we should see the processes of our Android device.

## Mod our first Unity app

This tutorial comes with a sample Unity app that designed for learning Frida, so let's begin by downloading the [apk file](https://github.com/kylesmile1103/Learn-Frida/raw/master/gameLearn.apk).

### Hook the script to desired app

First, we need to make Frida listen to our app, then use `-l` to hook the custom Javascript file, see the cmd below:

> frida -U <com.someapp> -l <someScript.js>
  
To spawn the app then listen to it right away, which is very helpful for early instrument, use `-f`

> frida -U -f <com.someapp> -l <someScript.js>
  
While spawning, Frida will pause the app for early instrument purpose, so we need `%resume` to resume it. Or we can do it automatically by adding `--no-pause` at the end of cmd, also use `-Uf` for brevity.

> frida -Uf <com.someapp> -l <someScript.js> --no-pause

**Note:**
The `-l <someScript.js>` is optional, Frida CLI is a [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) interface so we just need to paste the whole script into cmd line to execute it, but that is not ideally for large amount of codes. 

### Write the first script

Learning Frida script is not difficult since it supports Javascript API and others high-level programming language. Let's take a look at Javascript API [document](https://frida.re/docs/javascript-api/).

Clone [this repo](https://github.com/oleavr/frida-agent-example) and create new `.js` file inside of project folder so we can get code completion, type checking, inline docs, refactoring tools, etc.

Here're some mainly features that we're gonna focus on for modding Unity app:

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

## Frida with non-rooted devices

