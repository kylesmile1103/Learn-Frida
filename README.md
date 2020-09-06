# Learn how to use Frida with Unity app

This tutorial will help you understand quickly and easily how to mod Unity games with Frida.

## Introduction

According to Frida document, Frida is [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) for native apps, or, put in more technical terms, it’s a dynamic code instrumentation toolkit. It lets you inject snippets of JavaScript or your own library into native apps on Windows, macOS, GNU/Linux, iOS, Android, and QNX. [Learn more](https://frida.re/docs/home/)

### Explanation

"Frida" means "Free IDA", where Frida could be Ida’s sister, as IDA is a _static analysis_ tool and Frida is a _dynamic analysis_ toolkit.

It lets you inject snippets of JavaScript into native apps on Windows, Mac, Linux, iOS and Android. Frida also provides you with some simple tools built on top of the Frida API.

In other words, it allows you to inject your own code and to programmatically and interactively inspect and change running processes. Frida doesn’t need access to source code and can be used on iOS and Android devices that aren’t jailbroken or rooted. It lets you do all of this through APIs available from Objective-C, which are also exposed to higher-level languages through bindings.

## Install Frida-tools and Frida-server

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

This will list all the [running processes](https://frida.re/docs/frida-ps/) of our current OS:

![frida in cmd](https://i.imgur.com/uO49dpN.png)

### Install Frida-server

To communicate with Frida-tools from client-side, let's install Frida-server on whichever device we want to analyze. In this case, it's a Android device.

#### Requirement

* Rooted device
* ADB is enabled and authorized

First off, download the latest frida-server from the [releases](https://github.com/frida/frida/releases) page and uncompress it.

We are doing it on Android, so we need to find and download `frida-server-xx.xx.xx-android-arm64.xz`. After uncompressing, we should rename the file to `frida-server` and push to `data/local/tmp`

#### Install the server via ADB

> adb push frida-server /data/local/tmp/
> adb shell
> su
> chmod 755 /data/local/tmp/frida-server
> /data/local/tmp/frida-server &

