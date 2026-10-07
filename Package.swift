import Foundation
// swift-tools-version: 5.5
import PackageDescription

// Read version from package.json
func getVersion() -> String {
    let packageJSONPath = Context.packageDirectory + "/package.json"
    guard let data = try? Data(contentsOf: URL(fileURLWithPath: packageJSONPath)),
        let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
        let version = json["version"] as? String
    else {
        fatalError("Could not read version from package.json at \(packageJSONPath)")
    }
    return version
}

let version = getVersion()

let package = Package(
    name: "ScanditCapacitorDatacaptureParser",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "ScanditCapacitorDatacaptureParser",
            targets: ["ScanditParserNative"]
        )
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0"),
        .package(
            url: "https://github.com/Scandit/scandit-capacitor-datacapture-core.git",
            exact: Version(stringLiteral: version)
        ),
        .package(
            url: "https://github.com/Scandit/scandit-datacapture-frameworks-parser.git",
            exact: Version(stringLiteral: version)
        ),
    ],
    targets: [
        .target(
            name: "ScanditParserNative",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm"),
                .product(name: "ScanditCapacitorDatacaptureCore", package: "scandit-capacitor-datacapture-core"),
                .product(name: "ScanditFrameworksParser", package: "scandit-datacapture-frameworks-parser"),
            ],
            path: "ios/Sources/ScanditParserNative"
        ),
        .testTarget(
            name: "ScanditParserNativeTests",
            dependencies: ["ScanditParserNative"],
            path: "ios/Tests/ScanditParserNativeTests"
        ),
    ]
)
