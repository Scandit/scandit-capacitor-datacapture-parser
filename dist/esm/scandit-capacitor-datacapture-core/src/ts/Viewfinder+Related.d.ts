import { DefaultSerializeable } from './Serializeable';
export declare enum RectangularViewfinderStyle {
    Legacy = "legacy",
    Rounded = "rounded",
    Square = "square"
}
export declare enum RectangularViewfinderLineStyle {
    Light = "light",
    Bold = "bold"
}
export declare enum LaserlineViewfinderStyle {
    Legacy = "legacy",
    Animated = "animated"
}
interface RectangularViewfinderAnimationJSON {
    readonly looping: boolean;
}
export interface PrivateRectangularViewfinderAnimation {
    fromJSON(json: RectangularViewfinderAnimationJSON): RectangularViewfinderAnimation;
}
export declare class RectangularViewfinderAnimation extends DefaultSerializeable {
    private readonly _isLooping;
    private static fromJSON;
    get isLooping(): boolean;
    constructor(isLooping: boolean);
}
export {};
