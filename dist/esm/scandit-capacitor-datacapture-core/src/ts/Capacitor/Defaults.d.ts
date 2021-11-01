import { CameraPosition, CameraSettings, FocusGestureStrategy, FocusRange, VideoResolution } from '../Camera+Related';
import { Color, MarginsWithUnit, NumberWithUnit, PointWithUnit, SizeWithUnitAndAspect } from '../Common';
import { Anchor } from '../DataCaptureView';
import { FocusGesture, LogoStyle, ZoomGesture } from '../DataCaptureView+Related';
import { LaserlineViewfinderStyle, RectangularViewfinderAnimation, RectangularViewfinderLineStyle, RectangularViewfinderStyle } from '../Viewfinder+Related';
export interface CameraSettingsDefaults {
    preferredResolution: VideoResolution;
    zoomFactor: number;
    focusRange: FocusRange;
    zoomGestureZoomFactor: number;
    focusGestureStrategy: FocusGestureStrategy;
    shouldPreferSmoothAutoFocus: boolean;
}
export interface Defaults {
    Camera: {
        Settings: CameraSettingsDefaults;
        defaultPosition: Optional<CameraPosition>;
        availablePositions: CameraPosition[];
    };
    DataCaptureView: {
        scanAreaMargins: MarginsWithUnit;
        pointOfInterest: PointWithUnit;
        logoAnchor: Anchor;
        logoOffset: PointWithUnit;
        focusGesture: Optional<FocusGesture>;
        zoomGesture: Optional<ZoomGesture>;
        logoStyle: LogoStyle;
    };
    LaserlineViewfinder: {
        defaultStyle: string;
        styles: {
            [key: string]: {
                style: LaserlineViewfinderStyle;
                width: NumberWithUnit;
                enabledColor: Color;
                disabledColor: Color;
            };
        };
    };
    RectangularViewfinder: {
        defaultStyle: string;
        styles: {
            [key: string]: {
                size: SizeWithUnitAndAspect;
                color: Color;
                style: RectangularViewfinderStyle;
                lineStyle: RectangularViewfinderLineStyle;
                dimming: string;
                animation: RectangularViewfinderAnimation | null;
            };
        };
    };
    AimerViewfinder: {
        frameColor: Color;
        dotColor: Color;
    };
    Brush: {
        fillColor: Color;
        strokeColor: Color;
        strokeWidth: number;
    };
    deviceID: Optional<string>;
    capacitorVersion: Optional<string>;
}
export interface CameraSettingsDefaultsJSON {
    preferredResolution: string;
    zoomFactor: number;
    focusRange: string;
    zoomGestureZoomFactor: number;
    focusGestureStrategy: string;
    shouldPreferSmoothAutoFocus: boolean;
}
export interface PrivateCameraSettingsDefaults {
    fromJSON(json: CameraSettingsDefaultsJSON): CameraSettings;
}
interface LaserlineViewfinderDefault {
    width: string;
    enabledColor: string;
    disabledColor: string;
    style: string;
}
interface RectangularViewfinderDefault {
    size: string;
    color: string;
    style: string;
    lineStyle: string;
    dimming: number;
    animation: string;
}
export interface DefaultsJSON {
    Camera: {
        Settings: CameraSettingsDefaultsJSON;
        defaultPosition: Optional<string>;
        availablePositions: string[];
    };
    DataCaptureView: {
        scanAreaMargins: string;
        pointOfInterest: string;
        logoAnchor: string;
        logoOffset: string;
        focusGesture: string;
        zoomGesture: string;
        logoStyle: string;
    };
    LaserlineViewfinder: {
        defaultStyle: string;
        styles: {
            [key: string]: LaserlineViewfinderDefault;
        };
    };
    RectangularViewfinder: {
        defaultStyle: string;
        styles: {
            [key: string]: RectangularViewfinderDefault;
        };
    };
    AimerViewfinder: {
        frameColor: string;
        dotColor: string;
    };
    Brush: {
        fillColor: string;
        strokeColor: string;
        strokeWidth: number;
    };
    deviceID: Optional<string>;
    capacitorVersion: Optional<string>;
}
export declare const defaultsFromJSON: (json: DefaultsJSON) => Defaults;
export {};
