import { DataCaptureViewProxy } from './Capacitor/DataCaptureViewProxy';
import { MarginsWithUnit, Orientation, Point, PointWithUnit, Quadrilateral, Rect, Size } from './Common';
import { DataCaptureContext } from './DataCaptureContext';
import { FocusGesture, LogoStyle, ZoomGesture } from './DataCaptureView+Related';
import { DefaultSerializeable, Serializeable } from './Serializeable';
export interface DataCaptureOverlay {
}
export interface Control extends Serializeable {
}
export declare class TorchSwitchControl extends DefaultSerializeable implements Control {
    private type;
    private icon;
    private view;
    get torchOffImage(): string | null;
    set torchOffImage(torchOffImage: string | null);
    get torchOffPressedImage(): string | null;
    set torchOffPressedImage(torchOffPressedImage: string | null);
    get torchOnImage(): string | null;
    set torchOnImage(torchOnImage: string | null);
    get torchOnPressedImage(): string | null;
    set torchOnPressedImage(torchOnPressedImage: string | null);
}
export declare class ZoomSwitchControl extends DefaultSerializeable implements Control {
    private type;
    private icon;
    private view;
    get zoomedOutImage(): string | null;
    set zoomedOutImage(zoomedOutImage: string | null);
    get zoomedInImage(): string | null;
    set zoomedInImage(zoomedInImage: string | null);
    get zoomedInPressedImage(): string | null;
    set zoomedInPressedImage(zoomedInPressedImage: string | null);
    get zoomedOutPressedImage(): string | null;
    set zoomedOutPressedImage(zoomedOutPressedImage: string | null);
}
export interface DataCaptureViewListener {
    didChangeSize?(view: DataCaptureView, size: Size, orientation: Orientation): void;
}
export declare enum Anchor {
    TopLeft = "topLeft",
    TopCenter = "topCenter",
    TopRight = "topRight",
    CenterLeft = "centerLeft",
    Center = "center",
    CenterRight = "centerRight",
    BottomLeft = "bottomLeft",
    BottomCenter = "bottomCenter",
    BottomRight = "bottomRight"
}
export declare class HTMLElementState {
    isShown: boolean;
    position: Optional<{
        top: number;
        left: number;
    }>;
    size: Optional<{
        width: number;
        height: number;
    }>;
    shouldBeUnderContent: boolean;
    get isValid(): boolean;
    didChangeComparedTo(other: HTMLElementState): boolean;
}
export interface PrivateDataCaptureView {
    htmlElement: Optional<HTMLElement>;
    _htmlElementState: HTMLElementState;
    htmlElementState: HTMLElementState;
    readonly viewProxy: DataCaptureViewProxy;
    _viewProxy: DataCaptureViewProxy;
    overlays: DataCaptureOverlay[];
    controls: Control[];
    listeners: DataCaptureViewListener[];
    addControl(control: Control): void;
    removeControl(control: Control): void;
    initialize(): void;
    updatePositionAndSize(): void;
    _show(): void;
    _hide(): void;
    elementDidChange(): void;
    subscribeToChangesOnHTMLElement(): void;
    controlUpdated(): void;
}
export declare class DataCaptureView extends DefaultSerializeable {
    private _context;
    get context(): Optional<DataCaptureContext>;
    set context(context: Optional<DataCaptureContext>);
    scanAreaMargins: MarginsWithUnit;
    pointOfInterest: PointWithUnit;
    logoAnchor: Anchor;
    logoOffset: PointWithUnit;
    focusGesture: FocusGesture | null;
    zoomGesture: ZoomGesture | null;
    logoStyle: LogoStyle;
    private overlays;
    private controls;
    private _viewProxy;
    private get viewProxy();
    private listeners;
    private htmlElement;
    private _htmlElementState;
    private set htmlElementState(value);
    private get htmlElementState();
    private scrollListener;
    private domObserver;
    private orientationChangeListener;
    /**
     * The current context as a PrivateDataCaptureContext
     */
    private get privateContext();
    static forContext(context: Optional<DataCaptureContext>): DataCaptureView;
    constructor();
    connectToElement(element: HTMLElement): void;
    detachFromElement(): void;
    setFrame(frame: Rect, isUnderContent?: boolean): Promise<void>;
    show(): Promise<void>;
    hide(): Promise<void>;
    addOverlay(overlay: DataCaptureOverlay): void;
    removeOverlay(overlay: DataCaptureOverlay): void;
    addListener(listener: DataCaptureViewListener): void;
    removeListener(listener: DataCaptureViewListener): void;
    viewPointForFramePoint(point: Point): Promise<Point>;
    viewQuadrilateralForFrameQuadrilateral(quadrilateral: Quadrilateral): Promise<Quadrilateral>;
    addControl(control: Control): void;
    removeControl(control: Control): void;
    private controlUpdated;
    private initialize;
    private subscribeToChangesOnHTMLElement;
    private unsubscribeFromChangesOnHTMLElement;
    private elementDidChange;
    private updatePositionAndSize;
    private _show;
    private _hide;
}
