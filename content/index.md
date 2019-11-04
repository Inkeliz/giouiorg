# Gio

Gio implements portable immediate mode GUI programs in Go. Gio programs run on all the major platforms:
iOS/tvOS, Android, Linux (Wayland/X11), macOS, Windows, FreeBSD and browsers (Webassembly/WebGL).

Gio includes an efficient vector renderer based on the Pathfinder project (https://github.com/pcwalton/pathfinder).
Text and other shapes are rendered using only their outlines without baking them into texture images,
to support efficient animations, transformed drawing and pixel resolution independence.

[![GoDoc](https://godoc.org/gioui.org?status.svg)](https://godoc.org/gioui.org)


## Installation

Gio is designed to work with very few dependencies. It depends only on the platform libraries for
window management, input and GPU drawing.

- [Linux](/doc/install#linux)
- [macOS, iOS, tvOS](/doc/install#apple)
- [Windows](/doc/install#windows)
- [Android](/doc/install#android)
- [WebAssembly](/doc/install#wasm)


## Running Gio programs

With [Go 1.13](https://golang.org/dl/) or newer, initialize a new module and run
the "hello" example:

	$ go mod init example.com
	$ go run gioui.org/example/hello

should display a simple message in a window.

The command

	$ go run gioui.org/example/gophers

runs another example that displays Go contributors fetched from GitHub.

## Running on mobiles

For Android, iOS, tvOS the `gogio` tool can build and package a Gio program for you.

To build an Android .apk file from the `gophers` example:

	$ go run gioui.org/cmd/gogio -target android gioui.org/example/gophers

The apk can be installed to a running emulator or attached device with adb:

	$ adb install gophers.apk

The `gogio` tool passes command line arguments to os.Args at runtime:

	$ go run gioui.org/cmd/gogio -target android gioui.org/example/gophers -token <github token>

The `-appid` flag specifies the iOS bundle id or Android package id. The flag is required
for creating signed .ipa files for iOS and tvOS devices, because the bundle id must match an id
previously provisioned in Xcode. For example,

	$ go run gioui.org/cmd/gogio -target ios -appid <bundle-id> gioui.org/example/gophers

Use the `Window->Devices and Simulators` option in Xcode to install the ipa file to the device.
If you have [ideviceinstaller](https://github.com/libimobiledevice/ideviceinstaller) installed,
you can install the app from the command line:

	$ ideviceinstaller -i gophers.ipa

If you just want to run a program on the iOS simulator, use the `-o` flag to specify a .app
directory:

	$ go run gioui.org/cmd/gogio -o gophers.app -target ios gioui.org/example/gophers

Install the app to a running simulator with simctl:

	$ xcrun simctl install booted gophers.app


## Webassembly/WebGL

To run a Gio program in a compatible browser, the `gogio` tool can output a directory ready to
serve. With the `goxec` tool you don't even need a web server:

	$ go run gioui.org/cmd/gogio -target js gioui.org/example/gophers
	$ go get github.com/shurcooL/goexec
	$ goexec 'http.ListenAndServe(":8080", http.FileServer(http.Dir("gophers")))'

Open http://localhost:8080 in a browser to run the program.


## Integration with existing projects

See the [integration guide](/doc/integrate) for details on using
Gio with existing projects.


## Programs using Gio

- [Scatter](https://scatter.im), an implementation of the Signal protocol over email.


## Resources

- [FAQ](/doc/faq).
- [Gophercon 2019 talk](https://www.youtube.com/watch?v=9D6eWP4peYM) about Gio and [Scatter](https://scatter.im).
[Slides](https://go-talks.appspot.com/github.com/eliasnaur/gophercon-2019-talk/gophercon-2019.slide),
[Demos](https://github.com/eliasnaur/gophercon-2019-talk).
- [Gophercon UK 2019 talk](https://www.youtube.com/watch?v=PxnL3-Sex3o) demonstrating a Gio program built from scratch.
[Slides](https://go-talks.appspot.com/github.com/eliasnaur/gophercon-uk-2019-talk/gophercon-uk-2019-live.slide),
[Demos](https://github.com/eliasnaur/gophercon-uk-2019-talk).

## Source code

The source code for Gio is [hosted on
sourcehut](https://git.sr.ht/~eliasnaur/gio).

## Issues

File bugs and TODOs through the [issue tracker](https://todo.sr.ht/~eliasnaur/gio) or send an email
to [~eliasnaur/gio@todo.sr.ht](mailto:~eliasnaur/gio@todo.sr.ht). For general discussion, use the
mailing list: [~eliasnaur/gio@lists.sr.ht](mailto:~eliasnaur/gio@lists.sr.ht).


## Contributing

Post discussion and patches to the [mailing list](https://lists.sr.ht/~eliasnaur/gio). No Sourcehut
account is required and you can post without being subscribed.

See the [contribution guide](/doc/contribute) for more details.


## License

Dual-licensed under [UNLICENSE](https://unlicense.org) or the MIT.

## Sponsors

<div class="sponsor">
	<a href="https://orijtech.com/">
		<img srcset="/files/orijtech/orijtech.png,
					 /files/orijtech/orijtech@2x.png 2x,
					 /files/orijtech/orijtech@3x.png 3x"
					 src="/files/orijtech/orijtech@3x.png" alt="Orijtech, Inc." width="350">
		<em>"Observability and infrastructure for high performance systems and the cloud."</em>
	</a>
</div>


Gio's main developer is working full-time on Gio, 100% supported by
sponsorships. Please consider [sponsoring Gio](https://github.com/sponsors/eliasnaur) if you find it
useful. Sponsorships are handled by GitHub Sponsors and are easy to
set up.

## Donations

Bitcoin donations are gladly accepted to [bc1q8xw95urett00f4xs3v66p2l6xp2mfk5erpe5ug](bitcoin:bc1q8xw95urett00f4xs3v66p2l6xp2mfk5erpe5ug).
Donations will go toward hosting expenses and for supporting the author's full time work on Gio.
