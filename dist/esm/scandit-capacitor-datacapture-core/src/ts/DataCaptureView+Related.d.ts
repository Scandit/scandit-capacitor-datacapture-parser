import { DefaultSerializeable } from './Serializeable';
export interface FocusGesture {
}
export interface FocusGestureJSON {
    type: string;
}
export declare class PrivateFocusGestureDeserializer {
    static fromJSON(json: FocusGestureJSON | null): FocusGesture | null;
}
export declare class TapToFocus extends DefaultSerializeable implements FocusGesture {
    private type;
    constructor();
}
export interface ZoomGesture {
}
export interface ZoomGestureJSON {
    type: string;
}
export declare class PrivateZoomGestureDeserializer {
    static fromJSON(json: ZoomGestureJSON | null): ZoomGesture | null;
}
export declare class SwipeToZoom extends DefaultSerializeable implements ZoomGesture {
    private type;
    constructor();
}
export declare enum LogoStyle {
    Minimal = "minimal",
    Extended = "extended"
}
