
declare module "babylonjs-node-editor/blockTools" {
import { DiscardBlock } from "babylonjs/Materials/Node/Blocks/Fragment/discardBlock";
import { BonesBlock } from "babylonjs/Materials/Node/Blocks/Vertex/bonesBlock";
import { InstancesBlock } from "babylonjs/Materials/Node/Blocks/Vertex/instancesBlock";
import { MorphTargetsBlock } from "babylonjs/Materials/Node/Blocks/Vertex/morphTargetsBlock";
import { ImageProcessingBlock } from "babylonjs/Materials/Node/Blocks/Fragment/imageProcessingBlock";
import { ColorMergerBlock } from "babylonjs/Materials/Node/Blocks/colorMergerBlock";
import { VectorMergerBlock } from "babylonjs/Materials/Node/Blocks/vectorMergerBlock";
import { ColorSplitterBlock } from "babylonjs/Materials/Node/Blocks/colorSplitterBlock";
import { VectorSplitterBlock } from "babylonjs/Materials/Node/Blocks/vectorSplitterBlock";
import { RemapBlock } from "babylonjs/Materials/Node/Blocks/remapBlock";
import { TextureBlock } from "babylonjs/Materials/Node/Blocks/Dual/textureBlock";
import { ReflectionTextureBlock } from "babylonjs/Materials/Node/Blocks/Dual/reflectionTextureBlock";
import { LightBlock } from "babylonjs/Materials/Node/Blocks/Dual/lightBlock";
import { FogBlock } from "babylonjs/Materials/Node/Blocks/Dual/fogBlock";
import { VertexOutputBlock } from "babylonjs/Materials/Node/Blocks/Vertex/vertexOutputBlock";
import { FragmentOutputBlock } from "babylonjs/Materials/Node/Blocks/Fragment/fragmentOutputBlock";
import { NormalizeBlock } from "babylonjs/Materials/Node/Blocks/normalizeBlock";
import { AddBlock } from "babylonjs/Materials/Node/Blocks/addBlock";
import { ModBlock } from "babylonjs/Materials/Node/Blocks/modBlock";
import { ScaleBlock } from "babylonjs/Materials/Node/Blocks/scaleBlock";
import { TrigonometryBlock } from "babylonjs/Materials/Node/Blocks/trigonometryBlock";
import { ConditionalBlock } from "babylonjs/Materials/Node/Blocks/conditionalBlock";
import { ClampBlock } from "babylonjs/Materials/Node/Blocks/clampBlock";
import { CrossBlock } from "babylonjs/Materials/Node/Blocks/crossBlock";
import { DotBlock } from "babylonjs/Materials/Node/Blocks/dotBlock";
import { MultiplyBlock } from "babylonjs/Materials/Node/Blocks/multiplyBlock";
import { TransformBlock } from "babylonjs/Materials/Node/Blocks/transformBlock";
import { NodeMaterialBlockConnectionPointTypes } from "babylonjs/Materials/Node/Enums/nodeMaterialBlockConnectionPointTypes";
import { FresnelBlock } from "babylonjs/Materials/Node/Blocks/fresnelBlock";
import { LerpBlock } from "babylonjs/Materials/Node/Blocks/lerpBlock";
import { NLerpBlock } from "babylonjs/Materials/Node/Blocks/nLerpBlock";
import { DivideBlock } from "babylonjs/Materials/Node/Blocks/divideBlock";
import { SubtractBlock } from "babylonjs/Materials/Node/Blocks/subtractBlock";
import { StepBlock } from "babylonjs/Materials/Node/Blocks/stepBlock";
import { SmoothStepBlock } from "babylonjs/Materials/Node/Blocks/smoothStepBlock";
import { InputBlock } from "babylonjs/Materials/Node/Blocks/Input/inputBlock";
import { OneMinusBlock } from "babylonjs/Materials/Node/Blocks/oneMinusBlock";
import { ViewDirectionBlock } from "babylonjs/Materials/Node/Blocks/viewDirectionBlock";
import { LightInformationBlock } from "babylonjs/Materials/Node/Blocks/Vertex/lightInformationBlock";
import { MaxBlock } from "babylonjs/Materials/Node/Blocks/maxBlock";
import { MinBlock } from "babylonjs/Materials/Node/Blocks/minBlock";
import { PerturbNormalBlock } from "babylonjs/Materials/Node/Blocks/Fragment/perturbNormalBlock";
import { TBNBlock } from "babylonjs/Materials/Node/Blocks/Fragment/TBNBlock";
import { LengthBlock } from "babylonjs/Materials/Node/Blocks/lengthBlock";
import { DistanceBlock } from "babylonjs/Materials/Node/Blocks/distanceBlock";
import { FrontFacingBlock } from "babylonjs/Materials/Node/Blocks/Fragment/frontFacingBlock";
import { NegateBlock } from "babylonjs/Materials/Node/Blocks/negateBlock";
import { PowBlock } from "babylonjs/Materials/Node/Blocks/powBlock";
import { Scene } from "babylonjs/scene";
import { RandomNumberBlock } from "babylonjs/Materials/Node/Blocks/randomNumberBlock";
import { ReplaceColorBlock } from "babylonjs/Materials/Node/Blocks/replaceColorBlock";
import { PosterizeBlock } from "babylonjs/Materials/Node/Blocks/posterizeBlock";
import { ArcTan2Block } from "babylonjs/Materials/Node/Blocks/arcTan2Block";
import { ReciprocalBlock } from "babylonjs/Materials/Node/Blocks/reciprocalBlock";
import { GradientBlock } from "babylonjs/Materials/Node/Blocks/gradientBlock";
import { WaveBlock } from "babylonjs/Materials/Node/Blocks/waveBlock";
import { NodeMaterial } from "babylonjs/Materials/Node/nodeMaterial";
import { WorleyNoise3DBlock } from "babylonjs/Materials/Node/Blocks/worleyNoise3DBlock";
import { SimplexPerlin3DBlock } from "babylonjs/Materials/Node/Blocks/simplexPerlin3DBlock";
import { NormalBlendBlock } from "babylonjs/Materials/Node/Blocks/normalBlendBlock";
import { Rotate2dBlock } from "babylonjs/Materials/Node/Blocks/rotate2dBlock";
import { DerivativeBlock } from "babylonjs/Materials/Node/Blocks/Fragment/derivativeBlock";
import { RefractBlock } from "babylonjs/Materials/Node/Blocks/refractBlock";
import { ReflectBlock } from "babylonjs/Materials/Node/Blocks/reflectBlock";
import { DesaturateBlock } from "babylonjs/Materials/Node/Blocks/desaturateBlock";
import { PBRMetallicRoughnessBlock } from "babylonjs/Materials/Node/Blocks/PBR/pbrMetallicRoughnessBlock";
import { SheenBlock } from "babylonjs/Materials/Node/Blocks/PBR/sheenBlock";
import { AnisotropyBlock } from "babylonjs/Materials/Node/Blocks/PBR/anisotropyBlock";
import { ReflectionBlock } from "babylonjs/Materials/Node/Blocks/PBR/reflectionBlock";
import { ClearCoatBlock } from "babylonjs/Materials/Node/Blocks/PBR/clearCoatBlock";
import { RefractionBlock } from "babylonjs/Materials/Node/Blocks/PBR/refractionBlock";
import { SubSurfaceBlock } from "babylonjs/Materials/Node/Blocks/PBR/subSurfaceBlock";
import { CurrentScreenBlock } from "babylonjs/Materials/Node/Blocks/Dual/currentScreenBlock";
import { ParticleTextureBlock } from "babylonjs/Materials/Node/Blocks/Particle/particleTextureBlock";
import { ParticleRampGradientBlock } from "babylonjs/Materials/Node/Blocks/Particle/particleRampGradientBlock";
import { ParticleBlendMultiplyBlock } from "babylonjs/Materials/Node/Blocks/Particle/particleBlendMultiplyBlock";
import { FragCoordBlock } from "babylonjs/Materials/Node/Blocks/Fragment/fragCoordBlock";
import { ScreenSizeBlock } from "babylonjs/Materials/Node/Blocks/Fragment/screenSizeBlock";
import { MatrixBuilderBlock } from "babylonjs/Materials/Node/Blocks/matrixBuilderBlock";
import { SceneDepthBlock } from "babylonjs/Materials/Node/Blocks/Dual/sceneDepthBlock";
import { ImageSourceBlock } from "babylonjs/Materials/Node/Blocks/Dual/imageSourceBlock";
import { CloudBlock } from "babylonjs/Materials/Node/Blocks/cloudBlock";
import { VoronoiNoiseBlock } from "babylonjs/Materials/Node/Blocks/voronoiNoiseBlock";
import { ScreenSpaceBlock } from "babylonjs/Materials/Node/Blocks/Fragment/screenSpaceBlock";
import { TwirlBlock } from "babylonjs/Materials/Node/Blocks/Fragment/twirlBlock";
import { ElbowBlock } from "babylonjs/Materials/Node/Blocks/elbowBlock";
import { ClipPlanesBlock } from "babylonjs/Materials/Node/Blocks/Dual/clipPlanesBlock";
export class BlockTools {
    static GetBlockFromString(data: string, scene: Scene, nodeMaterial: NodeMaterial): ElbowBlock | TwirlBlock | VoronoiNoiseBlock | ScreenSpaceBlock | CloudBlock | MatrixBuilderBlock | DesaturateBlock | RefractBlock | ReflectBlock | DerivativeBlock | Rotate2dBlock | NormalBlendBlock | WorleyNoise3DBlock | SimplexPerlin3DBlock | BonesBlock | InstancesBlock | MorphTargetsBlock | DiscardBlock | ImageProcessingBlock | ColorMergerBlock | VectorMergerBlock | ColorSplitterBlock | VectorSplitterBlock | TextureBlock | ReflectionTextureBlock | LightBlock | FogBlock | VertexOutputBlock | FragmentOutputBlock | AddBlock | ClampBlock | ScaleBlock | CrossBlock | DotBlock | PowBlock | MultiplyBlock | TransformBlock | TrigonometryBlock | RemapBlock | NormalizeBlock | FresnelBlock | LerpBlock | NLerpBlock | DivideBlock | SubtractBlock | ModBlock | StepBlock | SmoothStepBlock | OneMinusBlock | ReciprocalBlock | ViewDirectionBlock | LightInformationBlock | MaxBlock | MinBlock | LengthBlock | DistanceBlock | NegateBlock | PerturbNormalBlock | TBNBlock | RandomNumberBlock | ReplaceColorBlock | PosterizeBlock | ArcTan2Block | GradientBlock | FrontFacingBlock | WaveBlock | InputBlock | PBRMetallicRoughnessBlock | SheenBlock | AnisotropyBlock | ReflectionBlock | ClearCoatBlock | RefractionBlock | SubSurfaceBlock | CurrentScreenBlock | ParticleTextureBlock | ParticleRampGradientBlock | ParticleBlendMultiplyBlock | FragCoordBlock | ScreenSizeBlock | SceneDepthBlock | ConditionalBlock | ImageSourceBlock | ClipPlanesBlock | null;
    static GetColorFromConnectionNodeType(type: NodeMaterialBlockConnectionPointTypes): string;
    static GetConnectionNodeTypeFromString(type: string): NodeMaterialBlockConnectionPointTypes.Float | NodeMaterialBlockConnectionPointTypes.Vector2 | NodeMaterialBlockConnectionPointTypes.Vector3 | NodeMaterialBlockConnectionPointTypes.Vector4 | NodeMaterialBlockConnectionPointTypes.Color3 | NodeMaterialBlockConnectionPointTypes.Color4 | NodeMaterialBlockConnectionPointTypes.Matrix | NodeMaterialBlockConnectionPointTypes.AutoDetect;
    static GetStringFromConnectionNodeType(type: NodeMaterialBlockConnectionPointTypes): "" | "Float" | "Vector2" | "Vector3" | "Vector4" | "Matrix" | "Color3" | "Color4";
}

}
declare module "babylonjs-node-editor/components/log/logComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-node-editor/globalState";
import "babylonjs-node-editor/components/log/log.scss";
interface ILogComponentProps {
    globalState: GlobalState;
}
export class LogEntry {
    message: string;
    isError: boolean;
    time: Date;
    constructor(message: string, isError: boolean);
}
export class LogComponent extends React.Component<ILogComponentProps, {
    logs: LogEntry[];
}> {
    constructor(props: ILogComponentProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/components/nodeList/nodeListComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-node-editor/globalState";
import "babylonjs-node-editor/components/nodeList/nodeList.scss";
interface INodeListComponentProps {
    globalState: GlobalState;
}
export class NodeListComponent extends React.Component<INodeListComponentProps, {
    filter: string;
}> {
    private _onResetRequiredObserver;
    private static _Tooltips;
    private _customFrameList;
    private _customBlockList;
    constructor(props: INodeListComponentProps);
    componentWillUnmount(): void;
    filterContent(filter: string): void;
    loadCustomFrame(file: File): void;
    removeItem(value: string): void;
    loadCustomBlock(file: File): void;
    removeCustomBlock(value: string): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/components/preview/previewAreaComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-node-editor/globalState";
interface IPreviewAreaComponentProps {
    globalState: GlobalState;
    width: number;
}
export class PreviewAreaComponent extends React.Component<IPreviewAreaComponentProps, {
    isLoading: boolean;
}> {
    private _onIsLoadingChangedObserver;
    private _onResetRequiredObserver;
    constructor(props: IPreviewAreaComponentProps);
    componentWillUnmount(): void;
    changeBackFaceCulling(value: boolean): void;
    changeDepthPrePass(value: boolean): void;
    _onPointerOverCanvas: () => void;
    _onPointerOutCanvas: () => void;
    changeParticleSystemBlendMode(newOne: number): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/components/preview/previewManager" {
import { GlobalState } from "babylonjs-node-editor/globalState";
import "babylonjs/Rendering/depthRendererSceneComponent";
export class PreviewManager {
    private _nodeMaterial;
    private _onBuildObserver;
    private _onPreviewCommandActivatedObserver;
    private _onAnimationCommandActivatedObserver;
    private _onUpdateRequiredObserver;
    private _onPreviewBackgroundChangedObserver;
    private _onBackFaceCullingChangedObserver;
    private _onDepthPrePassChangedObserver;
    private _onLightUpdatedObserver;
    private _engine;
    private _scene;
    private _meshes;
    private _camera;
    private _material;
    private _globalState;
    private _currentType;
    private _lightParent;
    private _postprocess;
    private _proceduralTexture;
    private _particleSystem;
    private _layer;
    constructor(targetCanvas: HTMLCanvasElement, globalState: GlobalState);
    private _handleAnimations;
    private _prepareLights;
    private _prepareScene;
    private _refreshPreviewMesh;
    private _loadParticleSystem;
    private _forceCompilationAsync;
    private _updatePreview;
    dispose(): void;
}

}
declare module "babylonjs-node-editor/components/preview/previewMeshControlComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-node-editor/globalState";
import { PreviewType } from "babylonjs-node-editor/components/preview/previewType";
interface IPreviewMeshControlComponent {
    globalState: GlobalState;
    togglePreviewAreaComponent: () => void;
}
export class PreviewMeshControlComponent extends React.Component<IPreviewMeshControlComponent> {
    private _colorInputRef;
    private _filePickerRef;
    private _onResetRequiredObserver;
    constructor(props: IPreviewMeshControlComponent);
    componentWillUnmount(): void;
    changeMeshType(newOne: PreviewType): void;
    useCustomMesh(evt: any): void;
    onPopUp(): void;
    changeAnimation(): void;
    changeBackground(value: string): void;
    changeBackgroundClick(): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/components/preview/previewType" {
export enum PreviewType {
    Sphere = 0,
    Box = 1,
    Torus = 2,
    Cylinder = 3,
    Plane = 4,
    ShaderBall = 5,
    DefaultParticleSystem = 6,
    Bubbles = 7,
    Smoke = 8,
    Rain = 9,
    Explosion = 10,
    Fire = 11,
    Custom = 12
}

}
declare module "babylonjs-node-editor/components/propertyTab/inputsPropertyTabComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-node-editor/globalState";
import { InputBlock } from "babylonjs/Materials/Node/Blocks/Input/inputBlock";
import "babylonjs-node-editor/components/propertyTab/propertyTab.scss";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface IInputsPropertyTabComponentProps {
    globalState: GlobalState;
    inputs: InputBlock[];
    lockObject: LockObject;
}
export class InputsPropertyTabComponent extends React.Component<IInputsPropertyTabComponentProps> {
    constructor(props: IInputsPropertyTabComponentProps);
    processInputBlockUpdate(ib: InputBlock): void;
    renderInputBlock(block: InputBlock): JSX.Element | null;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/components/propertyTab/properties/color3PropertyTabComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-node-editor/globalState";
import { InputBlock } from "babylonjs/Materials/Node/Blocks/Input/inputBlock";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface IColor3PropertyTabComponentProps {
    globalState: GlobalState;
    inputBlock: InputBlock;
    lockObject: LockObject;
}
export class Color3PropertyTabComponent extends React.Component<IColor3PropertyTabComponentProps> {
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/components/propertyTab/properties/color4PropertyTabComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-node-editor/globalState";
import { InputBlock } from "babylonjs/Materials/Node/Blocks/Input/inputBlock";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface IColor4PropertyTabComponentProps {
    globalState: GlobalState;
    inputBlock: InputBlock;
    lockObject: LockObject;
}
export class Color4PropertyTabComponent extends React.Component<IColor4PropertyTabComponentProps> {
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/components/propertyTab/properties/floatPropertyTabComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-node-editor/globalState";
import { InputBlock } from "babylonjs/Materials/Node/Blocks/Input/inputBlock";
interface IFloatPropertyTabComponentProps {
    globalState: GlobalState;
    inputBlock: InputBlock;
}
export class FloatPropertyTabComponent extends React.Component<IFloatPropertyTabComponentProps> {
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/components/propertyTab/properties/matrixPropertyTabComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-node-editor/globalState";
import { InputBlock } from "babylonjs/Materials/Node/Blocks/Input/inputBlock";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface IMatrixPropertyTabComponentProps {
    globalState: GlobalState;
    inputBlock: InputBlock;
    lockObject: LockObject;
}
export class MatrixPropertyTabComponent extends React.Component<IMatrixPropertyTabComponentProps> {
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/components/propertyTab/properties/vector2PropertyTabComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-node-editor/globalState";
import { InputBlock } from "babylonjs/Materials/Node/Blocks/Input/inputBlock";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface IVector2PropertyTabComponentProps {
    globalState: GlobalState;
    inputBlock: InputBlock;
    lockObject: LockObject;
}
export class Vector2PropertyTabComponent extends React.Component<IVector2PropertyTabComponentProps> {
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/components/propertyTab/properties/vector3PropertyTabComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-node-editor/globalState";
import { InputBlock } from "babylonjs/Materials/Node/Blocks/Input/inputBlock";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface IVector3PropertyTabComponentProps {
    globalState: GlobalState;
    inputBlock: InputBlock;
    lockObject: LockObject;
}
export class Vector3PropertyTabComponent extends React.Component<IVector3PropertyTabComponentProps> {
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/components/propertyTab/properties/vector4PropertyTabComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-node-editor/globalState";
import { InputBlock } from "babylonjs/Materials/Node/Blocks/Input/inputBlock";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface IVector4PropertyTabComponentProps {
    globalState: GlobalState;
    inputBlock: InputBlock;
    lockObject: LockObject;
}
export class Vector4PropertyTabComponent extends React.Component<IVector4PropertyTabComponentProps> {
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/components/propertyTab/propertyTabComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-node-editor/globalState";
import { Nullable } from "babylonjs/types";
import { InputBlock } from "babylonjs/Materials/Node/Blocks/Input/inputBlock";
import "babylonjs-node-editor/components/propertyTab/propertyTab.scss";
import { GraphNode } from "babylonjs-node-editor/nodeGraphSystem/graphNode";
import { GraphFrame } from "babylonjs-node-editor/nodeGraphSystem/graphFrame";
import { NodePort } from "babylonjs-node-editor/nodeGraphSystem/nodePort";
import { FrameNodePort } from "babylonjs-node-editor/nodeGraphSystem/frameNodePort";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface IPropertyTabComponentProps {
    globalState: GlobalState;
    lockObject: LockObject;
}
interface IPropertyTabComponentState {
    currentNode: Nullable<GraphNode>;
    currentFrame: Nullable<GraphFrame>;
    currentFrameNodePort: Nullable<FrameNodePort>;
    currentNodePort: Nullable<NodePort>;
    uploadInProgress: boolean;
}
export class PropertyTabComponent extends React.Component<IPropertyTabComponentProps, IPropertyTabComponentState> {
    private _onBuiltObserver;
    private _modeSelect;
    constructor(props: IPropertyTabComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    processInputBlockUpdate(ib: InputBlock): void;
    renderInputBlock(block: InputBlock): JSX.Element | null;
    load(file: File): void;
    loadFrame(file: File): void;
    save(): void;
    customSave(): void;
    saveToSnippetServer(): void;
    loadFromSnippet(): void;
    changeMode(value: any, force?: boolean, loadDefault?: boolean): boolean;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/globalState" {
import { NodeMaterial } from "babylonjs/Materials/Node/nodeMaterial";
import { Observable } from "babylonjs/Misc/observable";
import { LogEntry } from "babylonjs-node-editor/components/log/logComponent";
import { NodeMaterialBlock } from "babylonjs/Materials/Node/nodeMaterialBlock";
import { PreviewType } from "babylonjs-node-editor/components/preview/previewType";
import { Color4 } from "babylonjs/Maths/math.color";
import { NodeMaterialModes } from "babylonjs/Materials/Node/Enums/nodeMaterialModes";
import { GraphNode } from "babylonjs-node-editor/nodeGraphSystem/graphNode";
import { GraphFrame } from "babylonjs-node-editor/nodeGraphSystem/graphFrame";
import { Nullable } from "babylonjs/types";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
import { StateManager } from "babylonjs-node-editor/nodeGraphSystem/stateManager";
export class GlobalState {
    nodeMaterial: NodeMaterial;
    hostElement: HTMLElement;
    hostDocument: Document;
    hostWindow: Window;
    stateManager: StateManager;
    onBuiltObservable: Observable<void>;
    onResetRequiredObservable: Observable<boolean>;
    onZoomToFitRequiredObservable: Observable<void>;
    onReOrganizedRequiredObservable: Observable<void>;
    onLogRequiredObservable: Observable<LogEntry>;
    onIsLoadingChanged: Observable<boolean>;
    onPreviewCommandActivated: Observable<boolean>;
    onLightUpdated: Observable<void>;
    onPreviewBackgroundChanged: Observable<void>;
    onBackFaceCullingChanged: Observable<void>;
    onDepthPrePassChanged: Observable<void>;
    onAnimationCommandActivated: Observable<void>;
    onImportFrameObservable: Observable<any>;
    onPopupClosedObservable: Observable<void>;
    onGetNodeFromBlock: (block: NodeMaterialBlock) => GraphNode;
    previewType: PreviewType;
    previewFile: File;
    particleSystemBlendMode: number;
    listOfCustomPreviewFiles: File[];
    rotatePreview: boolean;
    backgroundColor: Color4;
    backFaceCulling: boolean;
    depthPrePass: boolean;
    lockObject: LockObject;
    hemisphericLight: boolean;
    directionalLight0: boolean;
    directionalLight1: boolean;
    controlCamera: boolean;
    _mode: NodeMaterialModes;
    pointerOverCanvas: boolean;
    /** Gets the mode */
    get mode(): NodeMaterialModes;
    /** Sets the mode */
    set mode(m: NodeMaterialModes);
    customSave?: {
        label: string;
        action: (data: string) => Promise<void>;
    };
    constructor();
    storeEditorData(serializationObject: any, frame?: Nullable<GraphFrame>): void;
}

}
declare module "babylonjs-node-editor/graphEditor" {
import * as React from "react";
import { GlobalState } from "babylonjs-node-editor/globalState";
import { NodeMaterialBlock } from "babylonjs/Materials/Node/nodeMaterialBlock";
import { Nullable } from "babylonjs/types";
import { IInspectorOptions } from "babylonjs/Debug/debugLayer";
import "babylonjs-node-editor/main.scss";
import { GraphNode } from "babylonjs-node-editor/nodeGraphSystem/graphNode";
import { IEditorData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeLocationInfo";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
interface IGraphEditorProps {
    globalState: GlobalState;
}
interface IGraphEditorState {
    showPreviewPopUp: boolean;
}
interface IInternalPreviewAreaOptions extends IInspectorOptions {
    popup: boolean;
    original: boolean;
    explorerWidth?: string;
    inspectorWidth?: string;
    embedHostWidth?: string;
}
export class GraphEditor extends React.Component<IGraphEditorProps, IGraphEditorState> {
    private _graphCanvasRef;
    private _diagramContainerRef;
    private _graphCanvas;
    private _diagramContainer;
    private _startX;
    private _moveInProgress;
    private _leftWidth;
    private _rightWidth;
    private _previewManager;
    private _mouseLocationX;
    private _mouseLocationY;
    private _onWidgetKeyUpPointer;
    private _previewHost;
    private _popUpWindow;
    appendBlock(dataToAppend: NodeMaterialBlock | INodeData, recursion?: boolean): GraphNode;
    addValueNode(type: string): GraphNode;
    componentDidMount(): void;
    componentWillUnmount(): void;
    constructor(props: IGraphEditorProps);
    zoomToFit(): void;
    buildMaterial(autoConfigure?: boolean): void;
    build(ignoreEditorData?: boolean): void;
    loadGraph(): void;
    showWaitScreen(): void;
    hideWaitScreen(): void;
    reOrganize(editorData?: Nullable<IEditorData>, isImportingAFrame?: boolean): void;
    onPointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
    onPointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
    onWheel: (evt: WheelEvent) => void;
    resizeColumns(evt: React.PointerEvent<HTMLDivElement>, forLeft?: boolean): void;
    buildColumnLayout(): string;
    emitNewBlock(blockType: string, targetX: number, targetY: number): void;
    dropNewBlock(event: React.DragEvent<HTMLDivElement>): void;
    handlePopUp: () => void;
    handleClosingPopUp: () => void;
    initiatePreviewArea: (canvas?: HTMLCanvasElement) => void;
    createPopUp: () => void;
    createPopupWindow: (title: string, windowVariableName: string, width?: number, height?: number) => Window | null;
    createPreviewMeshControlHost: (options: IInternalPreviewAreaOptions, parentControl: Nullable<HTMLElement>) => void;
    createPreviewHost: (options: IInternalPreviewAreaOptions, parentControl: Nullable<HTMLElement>) => void;
    fixPopUpStyles: (document: Document) => void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/graphSystem/blockNodeData" {
import { NodeMaterialBlock } from "babylonjs/Materials/Node/nodeMaterialBlock";
import { INodeContainer } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeContainer";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
import { IPortData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/portData";
export class BlockNodeData implements INodeData {
    data: NodeMaterialBlock;
    private _inputs;
    private _outputs;
    get uniqueId(): number;
    get name(): string;
    getClassName(): string;
    get isInput(): boolean;
    get inputs(): IPortData[];
    get outputs(): IPortData[];
    get comments(): string;
    set comments(value: string);
    getPortByName(name: string): IPortData | null;
    dispose(): void;
    prepareHeaderIcon(iconDiv: HTMLDivElement, img: HTMLImageElement): void;
    constructor(data: NodeMaterialBlock, nodeContainer: INodeContainer);
}

}
declare module "babylonjs-node-editor/graphSystem/connectionPointPortData" {
import { NodeMaterialConnectionPoint } from "babylonjs/Materials/Node/nodeMaterialBlockConnectionPoint";
import { NodeMaterialConnectionPointCompatibilityStates } from "babylonjs/Materials/Node/nodeMaterialBlockConnectionPoint";
import { Nullable } from "babylonjs/types";
import { GraphNode } from "babylonjs-node-editor/nodeGraphSystem/graphNode";
import { INodeContainer } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeContainer";
import { IPortData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/portData";
import { PortDataDirection } from "babylonjs-node-editor/nodeGraphSystem/interfaces/portData";
export class ConnectionPointPortData implements IPortData {
    private _connectedPort;
    private _nodeContainer;
    data: NodeMaterialConnectionPoint;
    get name(): string;
    get internalName(): string;
    get isExposedOnFrame(): boolean;
    set isExposedOnFrame(value: boolean);
    get exposedPortPosition(): number;
    set exposedPortPosition(value: number);
    get isConnected(): boolean;
    get connectedPort(): Nullable<IPortData>;
    set connectedPort(value: Nullable<IPortData>);
    get direction(): PortDataDirection;
    get ownerData(): import("babylonjs/Materials/Node/nodeMaterialBlock").NodeMaterialBlock;
    get needDualDirectionValidation(): boolean;
    get hasEndpoints(): boolean;
    get endpoints(): IPortData[];
    constructor(connectionPoint: NodeMaterialConnectionPoint, nodeContainer: INodeContainer);
    updateDisplayName(newName: string): void;
    connectTo(port: IPortData): void;
    canConnectTo(port: IPortData): boolean;
    disconnectFrom(port: IPortData): void;
    checkCompatibilityState(port: IPortData): 0 | NodeMaterialConnectionPointCompatibilityStates.TypeIncompatible | NodeMaterialConnectionPointCompatibilityStates.TargetIncompatible | NodeMaterialConnectionPointCompatibilityStates.HierarchyIssue;
    getCompatibilityIssueMessage(issue: number, targetNode: GraphNode, targetPort: IPortData): "" | "Cannot connect two different connection types" | "Source block can only work in fragment shader whereas destination block is currently aimed for the vertex shader" | "Source block cannot be connected with one of its ancestors";
}

}
declare module "babylonjs-node-editor/graphSystem/display/clampDisplayManager" {
import { IDisplayManager } from "babylonjs-node-editor/nodeGraphSystem/interfaces/displayManager";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
export class ClampDisplayManager implements IDisplayManager {
    getHeaderClass(): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(): string;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
}

}
declare module "babylonjs-node-editor/graphSystem/display/conditionalDisplayManager" {
import { IDisplayManager } from "babylonjs-node-editor/nodeGraphSystem/interfaces/displayManager";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
export class ConditionalDisplayManager implements IDisplayManager {
    getHeaderClass(): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(): string;
    updatePreviewContent(): void;
}

}
declare module "babylonjs-node-editor/graphSystem/display/discardDisplayManager" {
import { IDisplayManager } from "babylonjs-node-editor/nodeGraphSystem/interfaces/displayManager";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
export class DiscardDisplayManager implements IDisplayManager {
    getHeaderClass(): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(): string;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
}

}
declare module "babylonjs-node-editor/graphSystem/display/elbowDisplayManager" {
import { IDisplayManager } from "babylonjs-node-editor/nodeGraphSystem/interfaces/displayManager";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
export class ElbowDisplayManager implements IDisplayManager {
    getHeaderClass(): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(nodeData: INodeData): string;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
}

}
declare module "babylonjs-node-editor/graphSystem/display/gradientDisplayManager" {
import { IDisplayManager } from "babylonjs-node-editor/nodeGraphSystem/interfaces/displayManager";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
export class GradientDisplayManager implements IDisplayManager {
    getHeaderClass(): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(nodeData: INodeData): string;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
}

}
declare module "babylonjs-node-editor/graphSystem/display/imageSourceDisplayManager" {
import { IDisplayManager } from "babylonjs-node-editor/nodeGraphSystem/interfaces/displayManager";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
export class ImageSourceDisplayManager implements IDisplayManager {
    private _previewCanvas;
    private _previewImage;
    getHeaderClass(): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(): string;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
}

}
declare module "babylonjs-node-editor/graphSystem/display/inputDisplayManager" {
import { NodeMaterialBlockConnectionPointTypes } from "babylonjs/Materials/Node/Enums/nodeMaterialBlockConnectionPointTypes";
import { IDisplayManager } from "babylonjs-node-editor/nodeGraphSystem/interfaces/displayManager";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
export class InputDisplayManager implements IDisplayManager {
    getHeaderClass(nodeData: INodeData): "" | "constant" | "inspector";
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    static GetBaseType(type: NodeMaterialBlockConnectionPointTypes): string;
    getBackgroundColor(nodeData: INodeData): string;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
}

}
declare module "babylonjs-node-editor/graphSystem/display/outputDisplayManager" {
import { IDisplayManager } from "babylonjs-node-editor/nodeGraphSystem/interfaces/displayManager";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
export class OutputDisplayManager implements IDisplayManager {
    getHeaderClass(): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(): string;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
}

}
declare module "babylonjs-node-editor/graphSystem/display/pbrDisplayManager" {
import { IDisplayManager } from "babylonjs-node-editor/nodeGraphSystem/interfaces/displayManager";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
export class PBRDisplayManager implements IDisplayManager {
    getHeaderClass(): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(): string;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
}

}
declare module "babylonjs-node-editor/graphSystem/display/remapDisplayManager" {
import { IDisplayManager } from "babylonjs-node-editor/nodeGraphSystem/interfaces/displayManager";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
export class RemapDisplayManager implements IDisplayManager {
    getHeaderClass(): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(): string;
    private _extractInputValue;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
}

}
declare module "babylonjs-node-editor/graphSystem/display/textureDisplayManager" {
import { IDisplayManager } from "babylonjs-node-editor/nodeGraphSystem/interfaces/displayManager";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
export class TextureDisplayManager implements IDisplayManager {
    private _previewCanvas;
    private _previewImage;
    getHeaderClass(): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(nodeData: INodeData): string;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
}

}
declare module "babylonjs-node-editor/graphSystem/display/trigonometryDisplayManager" {
import { IDisplayManager } from "babylonjs-node-editor/nodeGraphSystem/interfaces/displayManager";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
export class TrigonometryDisplayManager implements IDisplayManager {
    getHeaderClass(): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(): string;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
}

}
declare module "babylonjs-node-editor/graphSystem/properties/colorMergerPropertyComponent" {
import * as React from "react";
import { IPropertyComponentProps } from "babylonjs-node-editor/nodeGraphSystem/interfaces/propertyComponentProps";
export class ColorMergerPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    constructor(props: IPropertyComponentProps);
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/graphSystem/properties/conditionalNodePropertyComponent" {
import * as React from "react";
import { IPropertyComponentProps } from "babylonjs-node-editor/nodeGraphSystem/interfaces/propertyComponentProps";
export class ConditionalPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    constructor(props: IPropertyComponentProps);
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/graphSystem/properties/frameNodePortPropertyComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-node-editor/globalState";
import { StateManager } from "babylonjs-node-editor/nodeGraphSystem/stateManager";
import { GraphFrame } from "babylonjs-node-editor/nodeGraphSystem/graphFrame";
import { FrameNodePort } from "babylonjs-node-editor/nodeGraphSystem/frameNodePort";
export interface IFrameNodePortPropertyTabComponentProps {
    stateManager: StateManager;
    globalState: GlobalState;
    frameNodePort: FrameNodePort;
    frame: GraphFrame;
}
export class FrameNodePortPropertyTabComponent extends React.Component<IFrameNodePortPropertyTabComponentProps, {
    port: FrameNodePort;
}> {
    private _onFramePortPositionChangedObserver;
    private _onSelectionChangedObserver;
    constructor(props: IFrameNodePortPropertyTabComponentProps);
    componentWillUnmount(): void;
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/graphSystem/properties/framePropertyComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-node-editor/globalState";
import { GraphFrame } from "babylonjs-node-editor/nodeGraphSystem/graphFrame";
export interface IFramePropertyTabComponentProps {
    globalState: GlobalState;
    frame: GraphFrame;
}
export class FramePropertyTabComponent extends React.Component<IFramePropertyTabComponentProps> {
    private _onFrameExpandStateChangedObserver;
    constructor(props: IFramePropertyTabComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/graphSystem/properties/genericNodePropertyComponent" {
import * as React from "react";
import { Scene } from "babylonjs/scene";
import { IPropertyComponentProps } from "babylonjs-node-editor/nodeGraphSystem/interfaces/propertyComponentProps";
export class GenericPropertyComponent extends React.Component<IPropertyComponentProps> {
    constructor(props: IPropertyComponentProps);
    render(): JSX.Element;
}
export class GeneralPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    constructor(props: IPropertyComponentProps);
    render(): JSX.Element;
}
export class GenericPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    constructor(props: IPropertyComponentProps);
    forceRebuild(notifiers?: {
        rebuild?: boolean;
        update?: boolean;
        activatePreviewCommand?: boolean;
        callback?: (scene: Scene) => void;
    }): void;
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/graphSystem/properties/gradientNodePropertyComponent" {
import * as React from "react";
import { GradientBlockColorStep } from "babylonjs/Materials/Node/Blocks/gradientBlock";
import { IPropertyComponentProps } from "babylonjs-node-editor/nodeGraphSystem/interfaces/propertyComponentProps";
export class GradientPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    private _onValueChangedObserver;
    constructor(props: IPropertyComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    forceRebuild(): void;
    deleteStep(step: GradientBlockColorStep): void;
    copyStep(step: GradientBlockColorStep): void;
    addNewStep(): void;
    checkForReOrder(): void;
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/graphSystem/properties/gradientStepComponent" {
import * as React from "react";
import { GradientBlockColorStep } from "babylonjs/Materials/Node/Blocks/gradientBlock";
import { StateManager } from "babylonjs-node-editor/nodeGraphSystem/stateManager";
interface IGradientStepComponentProps {
    stateManager: StateManager;
    step: GradientBlockColorStep;
    lineIndex: number;
    onDelete: () => void;
    onUpdateStep: () => void;
    onCheckForReOrder: () => void;
    onCopy?: () => void;
}
export class GradientStepComponent extends React.Component<IGradientStepComponentProps, {
    gradient: number;
}> {
    constructor(props: IGradientStepComponentProps);
    updateColor(color: string): void;
    updateStep(gradient: number): void;
    onPointerUp(): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/graphSystem/properties/imageSourcePropertyTabComponent" {
import * as React from "react";
import { ImageSourceBlock } from "babylonjs/Materials/Node/Blocks/Dual/imageSourceBlock";
import { IPropertyComponentProps } from "babylonjs-node-editor/nodeGraphSystem/interfaces/propertyComponentProps";
export class ImageSourcePropertyTabComponent extends React.Component<IPropertyComponentProps, {
    isEmbedded: boolean;
}> {
    get imageSourceBlock(): ImageSourceBlock;
    constructor(props: IPropertyComponentProps);
    UNSAFE_componentWillUpdate(nextProps: IPropertyComponentProps, nextState: {
        isEmbedded: boolean;
        loadAsCubeTexture: boolean;
    }): void;
    private _generateRandomForCache;
    updateAfterTextureLoad(): void;
    removeTexture(): void;
    _prepareTexture(): void;
    /**
     * Replaces the texture of the node
     * @param file the file of the texture to use
     */
    replaceTexture(file: File): void;
    replaceTextureWithUrl(url: string): void;
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/graphSystem/properties/inputNodePropertyComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-node-editor/globalState";
import { IPropertyComponentProps } from "babylonjs-node-editor/nodeGraphSystem/interfaces/propertyComponentProps";
export class InputPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    private _onValueChangedObserver;
    constructor(props: IPropertyComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    renderValue(globalState: GlobalState): JSX.Element | null;
    setDefaultValue(): void;
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/graphSystem/properties/lightInformationPropertyTabComponent" {
import * as React from "react";
import { IPropertyComponentProps } from "babylonjs-node-editor/nodeGraphSystem/interfaces/propertyComponentProps";
export class LightInformationPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/graphSystem/properties/lightPropertyTabComponent" {
import * as React from "react";
import { IPropertyComponentProps } from "babylonjs-node-editor/nodeGraphSystem/interfaces/propertyComponentProps";
export class LightPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/graphSystem/properties/nodePortPropertyComponent" {
import * as React from "react";
import { StateManager } from "babylonjs-node-editor/nodeGraphSystem/stateManager";
import { NodePort } from "babylonjs-node-editor/nodeGraphSystem/nodePort";
export interface IFrameNodePortPropertyTabComponentProps {
    stateManager: StateManager;
    nodePort: NodePort;
}
export class NodePortPropertyTabComponent extends React.Component<IFrameNodePortPropertyTabComponentProps> {
    private _onSelectionChangedObserver;
    constructor(props: IFrameNodePortPropertyTabComponentProps);
    componentWillUnmount(): void;
    toggleExposeOnFrame(value: boolean): void;
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/graphSystem/properties/texturePropertyTabComponent" {
import * as React from "react";
import { ReflectionTextureBlock } from "babylonjs/Materials/Node/Blocks/Dual/reflectionTextureBlock";
import { ReflectionBlock } from "babylonjs/Materials/Node/Blocks/PBR/reflectionBlock";
import { RefractionBlock } from "babylonjs/Materials/Node/Blocks/PBR/refractionBlock";
import { TextureBlock } from "babylonjs/Materials/Node/Blocks/Dual/textureBlock";
import { CurrentScreenBlock } from "babylonjs/Materials/Node/Blocks/Dual/currentScreenBlock";
import { ParticleTextureBlock } from "babylonjs/Materials/Node/Blocks/Particle/particleTextureBlock";
import { IPropertyComponentProps } from "babylonjs-node-editor/nodeGraphSystem/interfaces/propertyComponentProps";
type ReflectionTexture = ReflectionTextureBlock | ReflectionBlock | RefractionBlock;
type AnyTexture = TextureBlock | ReflectionTexture | CurrentScreenBlock | ParticleTextureBlock;
export class TexturePropertyTabComponent extends React.Component<IPropertyComponentProps, {
    isEmbedded: boolean;
    loadAsCubeTexture: boolean;
    textureIsPrefiltered: boolean;
}> {
    get textureBlock(): AnyTexture;
    constructor(props: IPropertyComponentProps);
    UNSAFE_componentWillUpdate(nextProps: IPropertyComponentProps, nextState: {
        isEmbedded: boolean;
        loadAsCubeTexture: boolean;
    }): void;
    private _generateRandomForCache;
    updateAfterTextureLoad(): void;
    removeTexture(): void;
    _prepareTexture(): void;
    /**
     * Replaces the texture of the node
     * @param file the file of the texture to use
     */
    replaceTexture(file: File): void;
    replaceTextureWithUrl(url: string): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/graphSystem/properties/transformNodePropertyComponent" {
import * as React from "react";
import { IPropertyComponentProps } from "babylonjs-node-editor/nodeGraphSystem/interfaces/propertyComponentProps";
export class TransformPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    constructor(props: IPropertyComponentProps);
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/graphSystem/properties/trigonometryNodePropertyComponent" {
import * as React from "react";
import { IPropertyComponentProps } from "babylonjs-node-editor/nodeGraphSystem/interfaces/propertyComponentProps";
export class TrigonometryPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    constructor(props: IPropertyComponentProps);
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/graphSystem/properties/vectorMergerPropertyComponent" {
import * as React from "react";
import { IPropertyComponentProps } from "babylonjs-node-editor/nodeGraphSystem/interfaces/propertyComponentProps";
export class VectorMergerPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    constructor(props: IPropertyComponentProps);
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/graphSystem/registerDefaultInput" {
import { StateManager } from "babylonjs-node-editor/nodeGraphSystem/stateManager";
export const RegisterDefaultInput: (stateManager: StateManager) => void;

}
declare module "babylonjs-node-editor/graphSystem/registerElbowSupport" {
import { StateManager } from "babylonjs-node-editor/nodeGraphSystem/stateManager";
export const RegisterElbowSupport: (stateManager: StateManager) => void;

}
declare module "babylonjs-node-editor/graphSystem/registerExportData" {
import { StateManager } from "babylonjs-node-editor/nodeGraphSystem/stateManager";
export const RegisterExportData: (stateManager: StateManager) => void;

}
declare module "babylonjs-node-editor/graphSystem/registerNodePortDesign" {
import { StateManager } from "babylonjs-node-editor/nodeGraphSystem/stateManager";
export const RegisterNodePortDesign: (stateManager: StateManager) => void;

}
declare module "babylonjs-node-editor/graphSystem/registerToDisplayLedger" {
export const RegisterToDisplayManagers: () => void;

}
declare module "babylonjs-node-editor/graphSystem/registerToPropertyLedger" {
export const RegisterToPropertyTabManagers: () => void;

}
declare module "babylonjs-node-editor/graphSystem/registerToTypeLedger" {
export const RegisterTypeLedger: () => void;

}
declare module "babylonjs-node-editor/index" {
export * from "babylonjs-node-editor/nodeEditor";

}
declare module "babylonjs-node-editor/legacy/legacy" {
export * from "babylonjs-node-editor/index";

}
declare module "babylonjs-node-editor/nodeEditor" {
import { NodeMaterial } from "babylonjs/Materials/Node/nodeMaterial";
import { Observable } from "babylonjs/Misc/observable";
/**
 * Interface used to specify creation options for the node editor
 */
export interface INodeEditorOptions {
    nodeMaterial: NodeMaterial;
    hostElement?: HTMLElement;
    customSave?: {
        label: string;
        action: (data: string) => Promise<void>;
    };
    customLoadObservable?: Observable<any>;
}
/**
 * Class used to create a node editor
 */
export class NodeEditor {
    private static _CurrentState;
    /**
     * Show the node editor
     * @param options defines the options to use to configure the node editor
     */
    static Show(options: INodeEditorOptions): void;
}

}
declare module "babylonjs-node-editor/portal" {
import * as React from "react";
import { GlobalState } from "babylonjs-node-editor/globalState";
interface IPortalProps {
    globalState: GlobalState;
}
export class Portal extends React.Component<IPortalProps> {
    render(): React.ReactPortal;
}
export {};

}
declare module "babylonjs-node-editor/serializationTools" {
import { NodeMaterial } from "babylonjs/Materials/Node/nodeMaterial";
import { GlobalState } from "babylonjs-node-editor/globalState";
import { Nullable } from "babylonjs/types";
import { GraphFrame } from "babylonjs-node-editor/nodeGraphSystem/graphFrame";
export class SerializationTools {
    static UpdateLocations(material: NodeMaterial, globalState: GlobalState, frame?: Nullable<GraphFrame>): void;
    static Serialize(material: NodeMaterial, globalState: GlobalState, frame?: Nullable<GraphFrame>): string;
    static Deserialize(serializationObject: any, globalState: GlobalState): void;
    static AddFrameToMaterial(serializationObject: any, globalState: GlobalState, currentMaterial: NodeMaterial): void;
}

}
declare module "babylonjs-node-editor/sharedComponents/checkBoxLineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
export interface ICheckBoxLineComponentProps {
    label: string;
    target?: any;
    propertyName?: string;
    isSelected?: () => boolean;
    onSelect?: (value: boolean) => void;
    onValueChanged?: () => void;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    disabled?: boolean;
}
export class CheckBoxLineComponent extends React.Component<ICheckBoxLineComponentProps, {
    isSelected: boolean;
    isDisabled?: boolean;
}> {
    private static _UniqueIdSeed;
    private _uniqueId;
    private _localChange;
    constructor(props: ICheckBoxLineComponentProps);
    shouldComponentUpdate(nextProps: ICheckBoxLineComponentProps, nextState: {
        isSelected: boolean;
        isDisabled: boolean;
    }): boolean;
    onChange(): void;
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/sharedComponents/draggableLineComponent" {
import * as React from "react";
export interface IButtonLineComponentProps {
    data: string;
    tooltip: string;
}
export class DraggableLineComponent extends React.Component<IButtonLineComponentProps> {
    constructor(props: IButtonLineComponentProps);
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/sharedComponents/draggableLineWithButtonComponent" {
import * as React from "react";
export interface IDraggableLineWithButtonComponent {
    data: string;
    tooltip: string;
    iconImage: any;
    onIconClick: (value: string) => void;
    iconTitle: string;
    lenSuffixToRemove?: number;
}
export class DraggableLineWithButtonComponent extends React.Component<IDraggableLineWithButtonComponent> {
    constructor(props: IDraggableLineWithButtonComponent);
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/sharedComponents/fileButtonLineComponent" {
import * as React from "react";
interface IFileButtonLineComponentProps {
    label: string;
    onClick: (file: File) => void;
    accept: string;
    uploadName?: string;
}
export class FileButtonLineComponent extends React.Component<IFileButtonLineComponentProps> {
    private _uploadRef;
    constructor(props: IFileButtonLineComponentProps);
    onChange(evt: any): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/sharedComponents/lineContainerComponent" {
import * as React from "react";
interface ILineContainerComponentProps {
    title: string;
    children: any[] | any;
    closed?: boolean;
}
export class LineContainerComponent extends React.Component<ILineContainerComponentProps, {
    isExpanded: boolean;
}> {
    constructor(props: ILineContainerComponentProps);
    switchExpandedState(): void;
    renderHeader(): JSX.Element;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/sharedComponents/lineWithFileButtonComponent" {
import * as React from "react";
interface ILineWithFileButtonComponentProps {
    title: string;
    closed?: boolean;
    label: string;
    iconImage: any;
    onIconClick: (file: File) => void;
    accept: string;
    uploadName?: string;
}
export class LineWithFileButtonComponent extends React.Component<ILineWithFileButtonComponentProps, {
    isExpanded: boolean;
}> {
    private _uploadRef;
    constructor(props: ILineWithFileButtonComponentProps);
    onChange(evt: any): void;
    switchExpandedState(): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/sharedComponents/messageDialog" {
import * as React from "react";
import { GlobalState } from "babylonjs-node-editor/globalState";
interface IMessageDialogComponentProps {
    globalState: GlobalState;
}
export class MessageDialogComponent extends React.Component<IMessageDialogComponentProps, {
    message: string;
    isError: boolean;
}> {
    constructor(props: IMessageDialogComponentProps);
    render(): JSX.Element | null;
}
export {};

}
declare module "babylonjs-node-editor/sharedComponents/popup" {
export class Popup {
    static CreatePopup(title: string, windowVariableName: string, width?: number, height?: number): HTMLDivElement | null;
    static _CopyStyles(sourceDoc: HTMLDocument, targetDoc: HTMLDocument): void;
}

}
declare module "babylonjs-node-editor/sharedComponents/textureLineComponent" {
import * as React from "react";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
interface ITextureLineComponentProps {
    texture: BaseTexture;
    width: number;
    height: number;
    globalState?: any;
    hideChannelSelect?: boolean;
}
export interface ITextureLineComponentState {
    displayRed: boolean;
    displayGreen: boolean;
    displayBlue: boolean;
    displayAlpha: boolean;
    face: number;
}
export class TextureLineComponent extends React.Component<ITextureLineComponentProps, ITextureLineComponentState> {
    private _canvasRef;
    constructor(props: ITextureLineComponentProps);
    shouldComponentUpdate(): boolean;
    componentDidMount(): void;
    componentDidUpdate(): void;
    updatePreview(): void;
    static UpdatePreview(previewCanvas: HTMLCanvasElement, texture: BaseTexture, width: number, options: ITextureLineComponentState, onReady?: () => void, globalState?: any): Promise<void>;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/colorPicker/colorComponentEntry" {
import * as React from "react";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
export interface IColorComponentEntryProps {
    value: number;
    label: string;
    max?: number;
    min?: number;
    onChange: (value: number) => void;
    disabled?: boolean;
    lockObject: LockObject;
}
export class ColorComponentEntry extends React.Component<IColorComponentEntryProps> {
    constructor(props: IColorComponentEntryProps);
    updateValue(valueString: string): void;
    lock(): void;
    unlock(): void;
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/colorPicker/colorPicker" {
import * as React from "react";
import { Color3, Color4 } from "babylonjs/Maths/math.color";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
import "babylonjs-node-editor/colorPicker/colorPicker.scss";
/**
 * Interface used to specify creation options for color picker
 */
export interface IColorPickerProps {
    color: Color3 | Color4;
    linearhint?: boolean;
    debugMode?: boolean;
    onColorChanged?: (color: Color3 | Color4) => void;
    lockObject: LockObject;
}
/**
 * Interface used to specify creation options for color picker
 */
export interface IColorPickerState {
    color: Color3;
    alpha: number;
}
/**
 * Class used to create a color picker
 */
export class ColorPicker extends React.Component<IColorPickerProps, IColorPickerState> {
    private _saturationRef;
    private _hueRef;
    private _isSaturationPointerDown;
    private _isHuePointerDown;
    constructor(props: IColorPickerProps);
    shouldComponentUpdate(nextProps: IColorPickerProps, nextState: IColorPickerState): boolean;
    onSaturationPointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
    onSaturationPointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
    onSaturationPointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
    onHuePointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
    onHuePointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
    onHuePointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
    private _evaluateSaturation;
    private _evaluateHue;
    componentDidUpdate(): void;
    raiseOnColorChanged(): void;
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/colorPicker/hexColor" {
import * as React from "react";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
export interface IHexColorProps {
    value: string;
    expectedLength: number;
    onChange: (value: string) => void;
    lockObject: LockObject;
}
export class HexColor extends React.Component<IHexColorProps, {
    hex: string;
}> {
    constructor(props: IHexColorProps);
    shouldComponentUpdate(nextProps: IHexColorProps, nextState: {
        hex: string;
    }): boolean;
    lock(): void;
    unlock(): void;
    updateHexValue(valueString: string): void;
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/components/Button" {
/// <reference types="react" />
export type ButtonProps = {
    disabled?: boolean;
    active?: boolean;
    onClick?: () => void;
    color: "light" | "dark";
    size: "default" | "small" | "wide";
    title?: string;
};
export const Button: React.FC<ButtonProps>;

}
declare module "babylonjs-node-editor/components/classNames" {
export function ClassNames(names: any, styleObject: any): string;

}
declare module "babylonjs-node-editor/components/Icon" {
/// <reference types="react" />
export type IconProps = {
    color?: "dark" | "light";
    icon: string;
};
export const Icon: React.FC<IconProps>;

}
declare module "babylonjs-node-editor/components/Label" {
import { ReactChild } from "react";
export type LabelProps = {
    text: string;
    children?: ReactChild;
    color?: "dark" | "light";
};
export const Label: React.FC<LabelProps>;

}
declare module "babylonjs-node-editor/components/Toggle" {
/// <reference types="react" />
export type ToggleProps = {
    toggled: "on" | "mixed" | "off";
    onToggle?: () => void;
    padded?: boolean;
    color?: "dark" | "light";
};
export const Toggle: React.FC<ToggleProps>;

}
declare module "babylonjs-node-editor/lines/booleanLineComponent" {
import * as React from "react";
export interface IBooleanLineComponentProps {
    label: string;
    value: boolean;
    icon?: string;
    iconLabel?: string;
}
export class BooleanLineComponent extends React.Component<IBooleanLineComponentProps> {
    constructor(props: IBooleanLineComponentProps);
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/lines/buttonLineComponent" {
import * as React from "react";
export interface IButtonLineComponentProps {
    label: string;
    onClick: () => void;
    icon?: string;
    iconLabel?: string;
    isDisabled?: boolean;
}
export class ButtonLineComponent extends React.Component<IButtonLineComponentProps> {
    constructor(props: IButtonLineComponentProps);
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/lines/checkBoxLineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";

export interface ICheckBoxLineComponentProps {
    label?: string;
    target?: any;
    propertyName?: string;
    isSelected?: () => boolean;
    onSelect?: (value: boolean) => void;
    onValueChanged?: () => void;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    disabled?: boolean;
    icon?: string;
    iconLabel?: string;
    faIcons?: {
        enabled: any;
        disabled: any;
    };
    large?: boolean;
}
export class CheckBoxLineComponent extends React.Component<ICheckBoxLineComponentProps, {
    isSelected: boolean;
    isDisabled?: boolean;
    isConflict: boolean;
}> {
    private _localChange;
    constructor(props: ICheckBoxLineComponentProps);
    shouldComponentUpdate(nextProps: ICheckBoxLineComponentProps, nextState: {
        isSelected: boolean;
        isDisabled: boolean;
        isConflict: boolean;
    }): boolean;
    onChange(): void;
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/lines/color3LineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
export interface IColor3LineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    isLinear?: boolean;
    icon?: string;
    lockObject: LockObject;
    iconLabel?: string;
    onChange?: () => void;
}
export class Color3LineComponent extends React.Component<IColor3LineComponentProps> {
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/lines/color4LineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
export interface IColor4LineComponentProps {
    label: string;
    target?: any;
    propertyName: string;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onChange?: () => void;
    isLinear?: boolean;
    icon?: string;
    iconLabel?: string;
    lockObject: LockObject;
}
export class Color4LineComponent extends React.Component<IColor4LineComponentProps> {
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/lines/colorLineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { Color4 } from "babylonjs/Maths/math.color";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
export interface IColorLineComponentProps {
    label: string;
    target?: any;
    propertyName: string;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onChange?: () => void;
    isLinear?: boolean;
    icon?: string;
    iconLabel?: string;
    disableAlpha?: boolean;
    lockObject: LockObject;
}
interface IColorLineComponentState {
    isExpanded: boolean;
    color: Color4;
}
export class ColorLineComponent extends React.Component<IColorLineComponentProps, IColorLineComponentState> {
    constructor(props: IColorLineComponentProps);
    shouldComponentUpdate(nextProps: IColorLineComponentProps, nextState: IColorLineComponentState): boolean;
    getValue(props?: Readonly<IColorLineComponentProps> & Readonly<{
        children?: React.ReactNode;
    }>): Color4;
    setColorFromString(colorString: string): void;
    setColor(newColor: Color4): void;
    switchExpandState(): void;
    updateStateR(value: number): void;
    updateStateG(value: number): void;
    updateStateB(value: number): void;
    updateStateA(value: number): void;
    copyToClipboard(): void;
    private _convertToColor;
    private _toColor3;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/colorPickerComponent" {
import * as React from "react";
import { Color4, Color3 } from "babylonjs/Maths/math.color";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
export interface IColorPickerComponentProps {
    value: Color4 | Color3;
    linearHint?: boolean;
    onColorChanged: (newOne: string) => void;
    icon?: string;
    iconLabel?: string;
    shouldPopRight?: boolean;
    lockObject?: LockObject;
}
interface IColorPickerComponentState {
    pickerEnabled: boolean;
    color: Color3 | Color4;
    hex: string;
}
export class ColorPickerLineComponent extends React.Component<IColorPickerComponentProps, IColorPickerComponentState> {
    private _floatRef;
    private _floatHostRef;
    constructor(props: IColorPickerComponentProps);
    syncPositions(): void;
    shouldComponentUpdate(nextProps: IColorPickerComponentProps, nextState: IColorPickerComponentState): boolean;
    getHexString(props?: Readonly<IColorPickerComponentProps> & Readonly<{
        children?: React.ReactNode;
    }>): string;
    componentDidUpdate(): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/draggableLineComponent" {
import * as React from "react";
export interface IButtonLineComponentProps {
    data: string;
    tooltip: string;
}
export class DraggableLineComponent extends React.Component<IButtonLineComponentProps> {
    constructor(props: IButtonLineComponentProps);
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/lines/fileButtonLineComponent" {
import * as React from "react";
interface IFileButtonLineComponentProps {
    label: string;
    onClick: (file: File) => void;
    accept: string;
    icon?: string;
    iconLabel?: string;
}
export class FileButtonLineComponent extends React.Component<IFileButtonLineComponentProps> {
    private static _IDGenerator;
    private _id;
    private _uploadInputRef;
    constructor(props: IFileButtonLineComponentProps);
    onChange(evt: any): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/fileMultipleButtonLineComponent" {
import * as React from "react";
interface IFileMultipleButtonLineComponentProps {
    label: string;
    onClick: (event: any) => void;
    accept: string;
    icon?: string;
    iconLabel?: string;
}
export class FileMultipleButtonLineComponent extends React.Component<IFileMultipleButtonLineComponentProps> {
    private static _IDGenerator;
    private _id;
    private _uploadInputRef;
    constructor(props: IFileMultipleButtonLineComponentProps);
    onChange(evt: any): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/floatLineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface IFloatLineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    lockObject: LockObject;
    onChange?: (newValue: number) => void;
    isInteger?: boolean;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    additionalClass?: string;
    step?: string;
    digits?: number;
    useEuler?: boolean;
    min?: number;
    max?: number;
    smallUI?: boolean;
    onEnter?: (newValue: number) => void;
    icon?: string;
    iconLabel?: string;
    defaultValue?: number;
    arrows?: boolean;
    unit?: React.ReactNode;
    onDragStart?: (newValue: number) => void;
    onDragStop?: (newValue: number) => void;
}
export class FloatLineComponent extends React.Component<IFloatLineComponentProps, {
    value: string;
    dragging: boolean;
}> {
    private _localChange;
    private _store;
    constructor(props: IFloatLineComponentProps);
    componentWillUnmount(): void;
    getValueString(value: any): string;
    shouldComponentUpdate(nextProps: IFloatLineComponentProps, nextState: {
        value: string;
        dragging: boolean;
    }): boolean;
    raiseOnPropertyChanged(newValue: number, previousValue: number): void;
    updateValue(valueString: string): void;
    lock(): void;
    unlock(): void;
    incrementValue(amount: number): void;
    onKeyDown(event: React.KeyboardEvent): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/hexLineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface IHexLineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    lockObject?: LockObject;
    onChange?: (newValue: number) => void;
    isInteger?: boolean;
    replaySourceReplacement?: string;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    additionalClass?: string;
    step?: string;
    digits?: number;
    useEuler?: boolean;
    min?: number;
    icon?: string;
    iconLabel?: string;
}
export class HexLineComponent extends React.Component<IHexLineComponentProps, {
    value: string;
}> {
    private _localChange;
    private _store;
    private _propertyChange;
    constructor(props: IHexLineComponentProps);
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: IHexLineComponentProps, nextState: {
        value: string;
    }): boolean;
    raiseOnPropertyChanged(newValue: number, previousValue: number): void;
    convertToHexString(valueString: string): string;
    updateValue(valueString: string, raisePropertyChanged: boolean): void;
    lock(): void;
    unlock(): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/iconButtonLineComponent" {
import * as React from "react";
export interface IIconButtonLineComponentProps {
    icon: string;
    onClick: () => void;
    tooltip: string;
    active?: boolean;
}
export class IconButtonLineComponent extends React.Component<IIconButtonLineComponentProps> {
    constructor(props: IIconButtonLineComponentProps);
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/lines/iconComponent" {
import * as React from "react";
interface IIconComponentProps {
    icon: string;
    label?: string;
}
export class IconComponent extends React.Component<IIconComponentProps> {
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/indentedTextLineComponent" {
import * as React from "react";
interface IIndentedTextLineComponentProps {
    value?: string;
    color?: string;
    underline?: boolean;
    onLink?: () => void;
    url?: string;
    additionalClass?: string;
}
export class IndentedTextLineComponent extends React.Component<IIndentedTextLineComponentProps> {
    constructor(props: IIndentedTextLineComponentProps);
    onLink(): void;
    renderContent(): JSX.Element;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/inputArrowsComponent" {
import * as React from "react";
interface IInputArrowsComponentProps {
    incrementValue: (amount: number) => void;
    setDragging: (dragging: boolean) => void;
}
export class InputArrowsComponent extends React.Component<IInputArrowsComponentProps> {
    private _arrowsRef;
    private _drag;
    private _releaseListener;
    private _lockChangeListener;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/iSelectedLineContainer" {
export interface ISelectedLineContainer {
    selectedLineContainerTitles: Array<string>;
    selectedLineContainerTitlesNoFocus: Array<string>;
}

}
declare module "babylonjs-node-editor/lines/lineContainerComponent" {
import * as React from "react";
import { ISelectedLineContainer } from "babylonjs-node-editor/lines/iSelectedLineContainer";
interface ILineContainerComponentProps {
    selection?: ISelectedLineContainer;
    title: string;
    children: any[] | any;
    closed?: boolean;
}
export class LineContainerComponent extends React.Component<ILineContainerComponentProps, {
    isExpanded: boolean;
    isHighlighted: boolean;
}> {
    constructor(props: ILineContainerComponentProps);
    switchExpandedState(): void;
    renderHeader(): JSX.Element;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/linkButtonComponent" {
import * as React from "react";

interface ILinkButtonComponentProps {
    label: string;
    buttonLabel: string;
    url?: string;
    onClick: () => void;
    icon?: any;
    onIconClick?: () => void;
}
export class LinkButtonComponent extends React.Component<ILinkButtonComponentProps> {
    constructor(props: ILinkButtonComponentProps);
    onLink(): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/matrixLineComponent" {
import * as React from "react";
import { Vector3, Vector4 } from "babylonjs/Maths/math.vector";
import { Matrix } from "babylonjs/Maths/math.vector";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface IMatrixLineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    step?: number;
    onChange?: (newValue: Matrix) => void;
    onModeChange?: (mode: number) => void;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    mode?: number;
    lockObject: LockObject;
}
export class MatrixLineComponent extends React.Component<IMatrixLineComponentProps, {
    value: Matrix;
    mode: number;
    angle: number;
}> {
    private _localChange;
    constructor(props: IMatrixLineComponentProps);
    shouldComponentUpdate(nextProps: IMatrixLineComponentProps, nextState: {
        value: Matrix;
        mode: number;
        angle: number;
    }): boolean;
    raiseOnPropertyChanged(previousValue: Vector3): void;
    updateMatrix(): void;
    updateRow(value: Vector4, row: number): void;
    updateBasedOnMode(value: number): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/messageLineComponent" {
import * as React from "react";

interface IMessageLineComponentProps {
    text: string;
    color?: string;
    icon?: any;
}
export class MessageLineComponent extends React.Component<IMessageLineComponentProps> {
    constructor(props: IMessageLineComponentProps);
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/numericInputComponent" {
import * as React from "react";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface INumericInputComponentProps {
    label: string;
    value: number;
    step?: number;
    onChange: (value: number) => void;
    precision?: number;
    icon?: string;
    iconLabel?: string;
    lockObject: LockObject;
}
export class NumericInputComponent extends React.Component<INumericInputComponentProps, {
    value: string;
}> {
    static defaultProps: {
        step: number;
    };
    private _localChange;
    constructor(props: INumericInputComponentProps);
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: INumericInputComponentProps, nextState: {
        value: string;
    }): boolean;
    updateValue(evt: any): void;
    onBlur(): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/optionsLineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { IInspectableOptions } from "babylonjs/Misc/iInspectable";
export const Null_Value: number;
export interface IOptionsLineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    options: IInspectableOptions[];
    noDirectUpdate?: boolean;
    onSelect?: (value: number | string) => void;
    extractValue?: (target: any) => number | string;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    allowNullValue?: boolean;
    icon?: string;
    iconLabel?: string;
    className?: string;
    valuesAreStrings?: boolean;
    defaultIfNull?: number;
}
export class OptionsLineComponent extends React.Component<IOptionsLineComponentProps, {
    value: number | string;
}> {
    private _localChange;
    private _remapValueIn;
    private _remapValueOut;
    private _getValue;
    constructor(props: IOptionsLineComponentProps);
    shouldComponentUpdate(nextProps: IOptionsLineComponentProps, nextState: {
        value: number;
    }): boolean;
    raiseOnPropertyChanged(newValue: number, previousValue: number): void;
    setValue(value: string | number): void;
    updateValue(valueString: string): void;
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/lines/popup" {
export class Popup {
    static CreatePopup(title: string, windowVariableName: string, width?: number, height?: number): HTMLDivElement | null;
    private static _CopyStyles;
}

}
declare module "babylonjs-node-editor/lines/radioLineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
interface IRadioButtonLineComponentProps {
    onSelectionChangedObservable: Observable<RadioButtonLineComponent>;
    label: string;
    isSelected: () => boolean;
    onSelect: () => void;
    icon?: string;
    iconLabel?: string;
}
export class RadioButtonLineComponent extends React.Component<IRadioButtonLineComponentProps, {
    isSelected: boolean;
}> {
    private _onSelectionChangedObserver;
    constructor(props: IRadioButtonLineComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onChange(): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/sliderLineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface ISliderLineComponentProps {
    label: string;
    target?: any;
    propertyName?: string;
    minimum: number;
    maximum: number;
    step: number;
    directValue?: number;
    useEuler?: boolean;
    onChange?: (value: number) => void;
    onInput?: (value: number) => void;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    decimalCount?: number;
    margin?: boolean;
    icon?: string;
    iconLabel?: string;
    lockObject: LockObject;
    unit?: React.ReactNode;
}
export class SliderLineComponent extends React.Component<ISliderLineComponentProps, {
    value: number;
}> {
    private _localChange;
    constructor(props: ISliderLineComponentProps);
    shouldComponentUpdate(nextProps: ISliderLineComponentProps, nextState: {
        value: number;
    }): boolean;
    onChange(newValueString: any): void;
    onInput(newValueString: any): void;
    prepareDataToRead(value: number): number;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/targetsProxy" {
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { Observable } from "babylonjs/Misc/observable";
export const conflictingValuesPlaceholder = "\u2014";
/**
 *
 * @param targets a list of selected targets
 * @param onPropertyChangedObservable
 * @param getProperty
 * @returns a proxy object that can be passed as a target into the input
 */
export function makeTargetsProxy<Type>(targets: Type[], onPropertyChangedObservable?: Observable<PropertyChangedEvent>, getProperty?: (target: Type, property: keyof Type) => any): any;

}
declare module "babylonjs-node-editor/lines/textInputLineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
export interface ITextInputLineComponentProps {
    label?: string;
    lockObject?: LockObject;
    target?: any;
    propertyName?: string;
    value?: string;
    onChange?: (value: string) => void;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    icon?: string;
    iconLabel?: string;
    noUnderline?: boolean;
    numbersOnly?: boolean;
    delayInput?: boolean;
    arrows?: boolean;
    arrowsIncrement?: (amount: number) => void;
    step?: number;
    numeric?: boolean;
    roundValues?: boolean;
    min?: number;
    max?: number;
    placeholder?: string;
    unit?: React.ReactNode;
    validator?: (value: string) => boolean;
    multilines?: boolean;
}
export class TextInputLineComponent extends React.Component<ITextInputLineComponentProps, {
    value: string;
    dragging: boolean;
}> {
    private _localChange;
    constructor(props: ITextInputLineComponentProps);
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: ITextInputLineComponentProps, nextState: {
        value: string;
        dragging: boolean;
    }): boolean;
    raiseOnPropertyChanged(newValue: string, previousValue: string): void;
    getCurrentNumericValue(value: string): number;
    updateValue(value: string, valueToValidate?: string): void;
    incrementValue(amount: number): void;
    onKeyDown(event: React.KeyboardEvent): void;
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/lines/textLineComponent" {
import * as React from "react";
interface ITextLineComponentProps {
    label?: string;
    value?: string;
    color?: string;
    underline?: boolean;
    onLink?: () => void;
    url?: string;
    ignoreValue?: boolean;
    additionalClass?: string;
    icon?: string;
    iconLabel?: string;
    tooltip?: string;
}
export class TextLineComponent extends React.Component<ITextLineComponentProps> {
    constructor(props: ITextLineComponentProps);
    onLink(): void;
    renderContent(): JSX.Element | null;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/unitButton" {
/// <reference types="react" />
interface IUnitButtonProps {
    unit: string;
    locked?: boolean;
    onClick?: (unit: string) => void;
}
export function UnitButton(props: IUnitButtonProps): JSX.Element;
export {};

}
declare module "babylonjs-node-editor/lines/valueLineComponent" {
import * as React from "react";
interface IValueLineComponentProps {
    label: string;
    value: number;
    color?: string;
    fractionDigits?: number;
    units?: string;
    icon?: string;
    iconLabel?: string;
}
export class ValueLineComponent extends React.Component<IValueLineComponentProps> {
    constructor(props: IValueLineComponentProps);
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/vector2LineComponent" {
import * as React from "react";
import { Vector2 } from "babylonjs/Maths/math.vector";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface IVector2LineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    step?: number;
    onChange?: (newvalue: Vector2) => void;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    icon?: string;
    iconLabel?: string;
    lockObject: LockObject;
}
export class Vector2LineComponent extends React.Component<IVector2LineComponentProps, {
    isExpanded: boolean;
    value: Vector2;
}> {
    static defaultProps: {
        step: number;
    };
    private _localChange;
    constructor(props: IVector2LineComponentProps);
    shouldComponentUpdate(nextProps: IVector2LineComponentProps, nextState: {
        isExpanded: boolean;
        value: Vector2;
    }): boolean;
    switchExpandState(): void;
    raiseOnPropertyChanged(previousValue: Vector2): void;
    updateStateX(value: number): void;
    updateStateY(value: number): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/vector3LineComponent" {
import * as React from "react";
import { Vector3 } from "babylonjs/Maths/math.vector";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface IVector3LineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    step?: number;
    onChange?: (newvalue: Vector3) => void;
    useEuler?: boolean;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    noSlider?: boolean;
    icon?: string;
    iconLabel?: string;
    lockObject: LockObject;
}
export class Vector3LineComponent extends React.Component<IVector3LineComponentProps, {
    isExpanded: boolean;
    value: Vector3;
}> {
    static defaultProps: {
        step: number;
    };
    private _localChange;
    constructor(props: IVector3LineComponentProps);
    getCurrentValue(): any;
    shouldComponentUpdate(nextProps: IVector3LineComponentProps, nextState: {
        isExpanded: boolean;
        value: Vector3;
    }): boolean;
    switchExpandState(): void;
    raiseOnPropertyChanged(previousValue: Vector3): void;
    updateVector3(): void;
    updateStateX(value: number): void;
    updateStateY(value: number): void;
    updateStateZ(value: number): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/lines/vector4LineComponent" {
import * as React from "react";
import { Vector4 } from "babylonjs/Maths/math.vector";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface IVector4LineComponentProps {
    label: string;
    target?: any;
    propertyName?: string;
    step?: number;
    onChange?: (newvalue: Vector4) => void;
    useEuler?: boolean;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    icon?: string;
    iconLabel?: string;
    value?: Vector4;
    lockObject: LockObject;
}
export class Vector4LineComponent extends React.Component<IVector4LineComponentProps, {
    isExpanded: boolean;
    value: Vector4;
}> {
    static defaultProps: {
        step: number;
    };
    private _localChange;
    constructor(props: IVector4LineComponentProps);
    getCurrentValue(): any;
    shouldComponentUpdate(nextProps: IVector4LineComponentProps, nextState: {
        isExpanded: boolean;
        value: Vector4;
    }): boolean;
    switchExpandState(): void;
    raiseOnPropertyChanged(previousValue: Vector4): void;
    updateVector4(): void;
    updateStateX(value: number): void;
    updateStateY(value: number): void;
    updateStateZ(value: number): void;
    updateStateW(value: number): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/nodeGraphSystem/displayLedger" {
export class DisplayLedger {
    static RegisteredControls: {
        [key: string]: any;
    };
}

}
declare module "babylonjs-node-editor/nodeGraphSystem/frameNodePort" {
import { IDisplayManager } from "babylonjs-node-editor/nodeGraphSystem/interfaces/displayManager";
import { Observable } from "babylonjs/Misc/observable";
import { Nullable } from "babylonjs/types";
import { IPortData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/portData";
import { NodePort } from "babylonjs-node-editor/nodeGraphSystem/nodePort";
import { GraphNode } from "babylonjs-node-editor/nodeGraphSystem/graphNode";
import { FramePortPosition } from "babylonjs-node-editor/nodeGraphSystem/graphFrame";
import { StateManager } from "babylonjs-node-editor/nodeGraphSystem/stateManager";
export class FrameNodePort extends NodePort {
    portData: IPortData;
    node: GraphNode;
    private _parentFrameId;
    private _isInput;
    private _framePortPosition;
    private _framePortId;
    private _onFramePortPositionChangedObservable;
    get parentFrameId(): number;
    get onFramePortPositionChangedObservable(): Observable<FrameNodePort>;
    get isInput(): boolean;
    get framePortId(): number;
    get framePortPosition(): FramePortPosition;
    set framePortPosition(position: FramePortPosition);
    constructor(portContainer: HTMLElement, portData: IPortData, node: GraphNode, stateManager: StateManager, isInput: boolean, framePortId: number, parentFrameId: number);
    static CreateFrameNodePortElement(portData: IPortData, node: GraphNode, root: HTMLElement, displayManager: Nullable<IDisplayManager>, stateManager: StateManager, isInput: boolean, framePortId: number, parentFrameId: number): FrameNodePort;
}

}
declare module "babylonjs-node-editor/nodeGraphSystem/graphCanvas" {
import * as React from "react";
import { GraphNode } from "babylonjs-node-editor/nodeGraphSystem/graphNode";
import { Nullable } from "babylonjs/types";
import { NodeLink } from "babylonjs-node-editor/nodeGraphSystem/nodeLink";
import { NodePort } from "babylonjs-node-editor/nodeGraphSystem/nodePort";
import { GraphFrame } from "babylonjs-node-editor/nodeGraphSystem/graphFrame";
import { IEditorData, IFrameData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeLocationInfo";
import { StateManager } from "babylonjs-node-editor/nodeGraphSystem/stateManager";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
import { IPortData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/portData";
import { INodeContainer } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeContainer";
import "babylonjs-node-editor/nodeGraphSystem/scss/graphCanvas.scss";
export interface IGraphCanvasComponentProps {
    stateManager: StateManager;
    onEmitNewNode: (nodeData: INodeData) => GraphNode;
}
export class GraphCanvasComponent extends React.Component<IGraphCanvasComponentProps> implements INodeContainer {
    static readonly NodeWidth: number;
    private readonly _minZoom;
    private readonly _maxZoom;
    private _hostCanvas;
    private _graphCanvas;
    private _selectionContainer;
    private _frameContainer;
    private _svgCanvas;
    private _rootContainer;
    private _nodes;
    private _links;
    private _mouseStartPointX;
    private _mouseStartPointY;
    private _dropPointX;
    private _dropPointY;
    private _selectionStartX;
    private _selectionStartY;
    private _candidateLinkedHasMoved;
    private _x;
    private _y;
    private _zoom;
    private _selectedNodes;
    private _selectedLink;
    private _selectedPort;
    private _candidateLink;
    private _candidatePort;
    private _gridSize;
    private _selectionBox;
    private _selectedFrames;
    private _frameCandidate;
    private _frames;
    private _nodeDataContentList;
    private _altKeyIsPressed;
    private _multiKeyIsPressed;
    private _oldY;
    _frameIsMoving: boolean;
    _isLoading: boolean;
    private _copiedNodes;
    private _copiedFrames;
    get gridSize(): number;
    set gridSize(value: number);
    get stateManager(): StateManager;
    get nodes(): GraphNode[];
    get links(): NodeLink[];
    get frames(): GraphFrame[];
    get zoom(): number;
    set zoom(value: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get selectedNodes(): GraphNode[];
    get selectedLink(): Nullable<NodeLink>;
    get selectedFrames(): GraphFrame[];
    get selectedPort(): Nullable<NodePort>;
    get canvasContainer(): HTMLDivElement;
    get hostCanvas(): HTMLDivElement;
    get svgCanvas(): HTMLElement;
    get selectionContainer(): HTMLDivElement;
    get frameContainer(): HTMLDivElement;
    private _selectedFrameAndNodesConflict;
    constructor(props: IGraphCanvasComponentProps);
    populateConnectedEntriesBeforeRemoval(item: GraphNode, items: GraphNode[], inputs: Nullable<IPortData>[], outputs: Nullable<IPortData>[]): void;
    automaticRewire(inputs: Nullable<IPortData>[], outputs: Nullable<IPortData>[]): void;
    handleKeyDown(evt: KeyboardEvent, onRemove: (nodeData: INodeData) => void, mouseLocationX: number, mouseLocationY: number, dataGenerator: (nodeData: INodeData) => any, rootElement: HTMLDivElement): void;
    pasteSelection(copiedNodes: GraphNode[], currentX: number, currentY: number, dataGenerator: (nodeData: INodeData) => any, selectNew?: boolean): GraphNode[];
    reconnectNewNodes(nodeIndex: number, newNodes: GraphNode[], sourceNodes: GraphNode[], done: boolean[]): void;
    getCachedData(): any[];
    removeDataFromCache(data: any): void;
    createNodeFromObject(nodeData: INodeData, onNodeCreated: (data: any) => void, recursion?: boolean): GraphNode;
    getGridPosition(position: number, useCeil?: boolean): number;
    getGridPositionCeil(position: number): number;
    updateTransform(): void;
    onKeyUp(): void;
    findNodeFromData(data: any): GraphNode;
    reset(): void;
    connectPorts(pointA: IPortData, pointB: IPortData): void;
    removeLink(link: NodeLink): void;
    appendNode(nodeData: INodeData): GraphNode;
    distributeGraph(): void;
    componentDidMount(): void;
    onMove(evt: React.PointerEvent): void;
    onDown(evt: React.PointerEvent<HTMLElement>): void;
    onUp(evt: React.PointerEvent): void;
    onWheel(evt: React.WheelEvent): void;
    zoomToFit(): void;
    processCandidatePort(): void;
    connectNodes(nodeA: GraphNode, pointA: IPortData, nodeB: GraphNode, pointB: IPortData): void;
    drop(newNode: GraphNode, targetX: number, targetY: number, offsetX: number, offsetY: number): void;
    processEditorData(editorData: IEditorData): void;
    reOrganize(editorData?: Nullable<IEditorData>, isImportingAFrame?: boolean): void;
    addFrame(frameData: IFrameData): void;
    render(): JSX.Element;
}

}
declare module "babylonjs-node-editor/nodeGraphSystem/graphFrame" {
import { GraphNode } from "babylonjs-node-editor/nodeGraphSystem/graphNode";
import { GraphCanvasComponent } from "babylonjs-node-editor/nodeGraphSystem/graphCanvas";
import { Nullable } from "babylonjs/types";
import { Observable } from "babylonjs/Misc/observable";
import { Color3 } from "babylonjs/Maths/math.color";
import { FrameNodePort } from "babylonjs-node-editor/nodeGraphSystem/frameNodePort";
import { IFrameData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeLocationInfo";
export enum FramePortPosition {
    Top = 0,
    Middle = 1,
    Bottom = 2
}
export class GraphFrame {
    private readonly _collapsedWidth;
    private static _FrameCounter;
    private static _FramePortCounter;
    private _name;
    private _color;
    private _x;
    private _y;
    private _gridAlignedX;
    private _gridAlignedY;
    private _width;
    private _height;
    element: HTMLDivElement;
    private _borderElement;
    private _headerElement;
    private _headerTextElement;
    private _headerCollapseElement;
    private _headerCloseElement;
    private _commentsElement;
    private _portContainer;
    private _outputPortContainer;
    private _inputPortContainer;
    private _nodes;
    private _ownerCanvas;
    private _mouseStartPointX;
    private _mouseStartPointY;
    private _onSelectionChangedObserver;
    private _onGraphNodeRemovalObserver;
    private _onExposePortOnFrameObserver;
    private _onNodeLinkDisposedObservers;
    private _isCollapsed;
    private _frameInPorts;
    private _frameOutPorts;
    private _controlledPorts;
    private _exposedInPorts;
    private _exposedOutPorts;
    private _id;
    private _comments;
    private _frameIsResizing;
    private _resizingDirection;
    private _minFrameHeight;
    private _minFrameWidth;
    private _mouseXLimit;
    onExpandStateChanged: Observable<GraphFrame>;
    private readonly _closeSVG;
    private readonly _expandSVG;
    private readonly _collapseSVG;
    get id(): number;
    get isCollapsed(): boolean;
    private _createInputPort;
    private _markFramePortPositions;
    private _createFramePorts;
    private _removePortFromExposedWithNode;
    private _removePortFromExposedWithLink;
    private _createInputPorts;
    private _createOutputPorts;
    redrawFramePorts(): void;
    set isCollapsed(value: boolean);
    get nodes(): GraphNode[];
    get ports(): FrameNodePort[];
    get name(): string;
    set name(value: string);
    get color(): Color3;
    set color(value: Color3);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
    get comments(): string;
    set comments(comments: string);
    constructor(candidate: Nullable<HTMLDivElement>, canvas: GraphCanvasComponent, doNotCaptureNodes?: boolean);
    refresh(): void;
    addNode(node: GraphNode): void;
    removeNode(node: GraphNode): void;
    syncNode(node: GraphNode): void;
    cleanAccumulation(): void;
    private _onDown;
    move(newX: number, newY: number, align?: boolean): void;
    private _onUp;
    _moveFrame(offsetX: number, offsetY: number): void;
    private _onMove;
    moveFramePortUp(nodePort: FrameNodePort): void;
    private _movePortUp;
    moveFramePortDown(nodePort: FrameNodePort): void;
    private _movePortDown;
    private _initResizing;
    private _cleanUpResizing;
    private _updateMinHeightWithComments;
    private _isResizingTop;
    private _isResizingRight;
    private _isResizingBottom;
    private _isResizingLeft;
    private _onRightHandlePointerDown;
    private _onRightHandlePointerMove;
    private _moveRightHandle;
    private _onRightHandlePointerUp;
    private _onBottomHandlePointerDown;
    private _onBottomHandlePointerMove;
    private _moveBottomHandle;
    private _onBottomHandlePointerUp;
    private _onLeftHandlePointerDown;
    private _onLeftHandlePointerMove;
    private _moveLeftHandle;
    private _onLeftHandlePointerUp;
    private _onTopHandlePointerDown;
    private _onTopHandlePointerMove;
    private _moveTopHandle;
    private _onTopHandlePointerUp;
    private _onTopRightHandlePointerDown;
    private _onTopRightHandlePointerMove;
    private _moveTopRightHandle;
    private _onTopRightHandlePointerUp;
    private _onBottomRightHandlePointerDown;
    private _onBottomRightHandlePointerMove;
    private _moveBottomRightHandle;
    private _onBottomRightHandlePointerUp;
    private _onBottomLeftHandlePointerDown;
    private _onBottomLeftHandlePointerMove;
    private _moveBottomLeftHandle;
    private _onBottomLeftHandlePointerUp;
    private _onTopLeftHandlePointerDown;
    private _onTopLeftHandlePointerMove;
    private _moveTopLeftHandle;
    private _onTopLeftHandlePointerUp;
    private _expandLeft;
    private _expandTop;
    private _expandRight;
    private _expandBottom;
    dispose(): void;
    private _serializePortData;
    serialize(saveCollapsedState: boolean): IFrameData;
    export(): void;
    adjustPorts(): void;
    static Parse(serializationData: IFrameData, canvas: GraphCanvasComponent, map?: {
        [key: number]: number;
    }): GraphFrame;
}

}
declare module "babylonjs-node-editor/nodeGraphSystem/graphNode" {
/// <reference types="react" />
import { Nullable } from "babylonjs/types";
import { GraphCanvasComponent } from "babylonjs-node-editor/nodeGraphSystem/graphCanvas";
import { NodePort } from "babylonjs-node-editor/nodeGraphSystem/nodePort";
import { GraphFrame } from "babylonjs-node-editor/nodeGraphSystem/graphFrame";
import { NodeLink } from "babylonjs-node-editor/nodeGraphSystem/nodeLink";
import { StateManager } from "babylonjs-node-editor/nodeGraphSystem/stateManager";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
import { IPortData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/portData";
export class GraphNode {
    content: INodeData;
    private _visual;
    private _headerContainer;
    private _headerIcon;
    private _headerIconImg;
    private _header;
    private _connections;
    private _inputsContainer;
    private _outputsContainer;
    private _content;
    private _comments;
    private _inputPorts;
    private _outputPorts;
    private _links;
    private _x;
    private _y;
    private _gridAlignedX;
    private _gridAlignedY;
    private _mouseStartPointX;
    private _mouseStartPointY;
    private _stateManager;
    private _onSelectionChangedObserver;
    private _onSelectionBoxMovedObserver;
    private _onFrameCreatedObserver;
    private _onUpdateRequiredObserver;
    private _ownerCanvas;
    private _isSelected;
    private _displayManager;
    private _isVisible;
    private _enclosingFrameId;
    get isVisible(): boolean;
    set isVisible(value: boolean);
    private _upateNodePortNames;
    get outputPorts(): NodePort[];
    get inputPorts(): NodePort[];
    get links(): NodeLink[];
    get gridAlignedX(): number;
    get gridAlignedY(): number;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get width(): number;
    get height(): number;
    get id(): number;
    get name(): string;
    get isSelected(): boolean;
    get enclosingFrameId(): number;
    set enclosingFrameId(value: number);
    set isSelected(value: boolean);
    setIsSelected(value: boolean, marqueeSelection: boolean): void;
    constructor(content: INodeData, stateManager: StateManager);
    isOverlappingFrame(frame: GraphFrame): boolean;
    getPortForPortData(portData: IPortData): NodePort | null;
    getPortDataForPortDataContent(data: any): IPortData | null;
    getLinksForPortDataContent(data: any): NodeLink[];
    getLinksForPortData(portData: IPortData): NodeLink[];
    private _refreshFrames;
    _refreshLinks(): void;
    refresh(): void;
    private _onDown;
    cleanAccumulation(useCeil?: boolean): void;
    private _onUp;
    private _onMove;
    renderProperties(): Nullable<JSX.Element>;
    appendVisual(root: HTMLDivElement, owner: GraphCanvasComponent): void;
    dispose(): void;
}

}
declare module "babylonjs-node-editor/nodeGraphSystem/interfaces/displayManager" {
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
import { IPortData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/portData";
export interface IDisplayManager {
    getHeaderClass(data: INodeData): string;
    shouldDisplayPortLabels(data: IPortData): boolean;
    updatePreviewContent(data: INodeData, contentArea: HTMLDivElement): void;
    getBackgroundColor(data: INodeData): string;
    getHeaderText(data: INodeData): string;
}

}
declare module "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeContainer" {
import { GraphNode } from "babylonjs-node-editor/nodeGraphSystem/graphNode";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
export interface INodeContainer {
    nodes: GraphNode[];
    appendNode(data: INodeData): GraphNode;
}

}
declare module "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData" {
import { Nullable } from "babylonjs/types";
import { IPortData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/portData";
export interface INodeData {
    data: any;
    name: string;
    uniqueId: number;
    isInput: boolean;
    comments: string;
    prepareHeaderIcon: (iconDiv: HTMLDivElement, img: HTMLImageElement) => void;
    getClassName: () => string;
    dispose: () => void;
    getPortByName: (name: string) => Nullable<IPortData>;
    inputs: IPortData[];
    outputs: IPortData[];
}

}
declare module "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeLocationInfo" {
export interface INodeLocationInfo {
    blockId: number;
    x: number;
    y: number;
}
export interface IFrameData {
    x: number;
    y: number;
    width: number;
    height: number;
    color: number[];
    name: string;
    isCollapsed: boolean;
    blocks: number[];
    comments: string;
}
export interface IEditorData {
    locations: INodeLocationInfo[];
    x: number;
    y: number;
    zoom: number;
    frames?: IFrameData[];
    map?: {
        [key: number]: number;
    };
}

}
declare module "babylonjs-node-editor/nodeGraphSystem/interfaces/portData" {
import { Nullable } from "babylonjs/types";
import { GraphNode } from "babylonjs-node-editor/nodeGraphSystem/graphNode";
export enum PortDataDirection {
    /** Input */
    Input = 0,
    /** Output */
    Output = 1
}
export interface IPortData {
    data: any;
    name: string;
    internalName: string;
    isExposedOnFrame: boolean;
    exposedPortPosition: number;
    isConnected: boolean;
    direction: PortDataDirection;
    ownerData: any;
    connectedPort: Nullable<IPortData>;
    needDualDirectionValidation: boolean;
    hasEndpoints: boolean;
    endpoints: Nullable<IPortData[]>;
    updateDisplayName: (newName: string) => void;
    canConnectTo: (port: IPortData) => boolean;
    connectTo: (port: IPortData) => void;
    disconnectFrom: (port: IPortData) => void;
    checkCompatibilityState(port: IPortData): number;
    getCompatibilityIssueMessage(issue: number, targetNode: GraphNode, targetPort: IPortData): string;
}

}
declare module "babylonjs-node-editor/nodeGraphSystem/interfaces/propertyComponentProps" {
import { StateManager } from "babylonjs-node-editor/nodeGraphSystem/stateManager";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
export interface IPropertyComponentProps {
    stateManager: StateManager;
    nodeData: INodeData;
}

}
declare module "babylonjs-node-editor/nodeGraphSystem/interfaces/selectionChangedOptions" {
import { Nullable } from "babylonjs/types";
import { GraphFrame } from "babylonjs-node-editor/nodeGraphSystem/graphFrame";
import { GraphNode } from "babylonjs-node-editor/nodeGraphSystem/graphNode";
import { NodeLink } from "babylonjs-node-editor/nodeGraphSystem/nodeLink";
import { NodePort } from "babylonjs-node-editor/nodeGraphSystem/nodePort";
import { FramePortData } from "babylonjs-node-editor/nodeGraphSystem/types/framePortData";
export interface ISelectionChangedOptions {
    selection: Nullable<GraphNode | NodeLink | GraphFrame | NodePort | FramePortData>;
    forceKeepSelection?: boolean;
    marqueeSelection?: boolean;
}

}
declare module "babylonjs-node-editor/nodeGraphSystem/nodeLink" {
import { Observable } from "babylonjs/Misc/observable";
import { FrameNodePort } from "babylonjs-node-editor/nodeGraphSystem/frameNodePort";
import { NodePort } from "babylonjs-node-editor/nodeGraphSystem/nodePort";
import { GraphNode } from "babylonjs-node-editor/nodeGraphSystem/graphNode";
import { GraphCanvasComponent } from "babylonjs-node-editor/nodeGraphSystem/graphCanvas";
export class NodeLink {
    private _graphCanvas;
    private _portA;
    private _portB?;
    private _nodeA;
    private _nodeB?;
    private _path;
    private _selectionPath;
    private _onSelectionChangedObserver;
    private _isVisible;
    onDisposedObservable: Observable<NodeLink>;
    get isVisible(): boolean;
    set isVisible(value: boolean);
    get portA(): FrameNodePort | NodePort;
    get portB(): FrameNodePort | NodePort | undefined;
    get nodeA(): GraphNode;
    get nodeB(): GraphNode | undefined;
    update(endX?: number, endY?: number, straight?: boolean): void;
    constructor(graphCanvas: GraphCanvasComponent, portA: NodePort, nodeA: GraphNode, portB?: NodePort, nodeB?: GraphNode);
    onClick(evt: MouseEvent): void;
    dispose(notify?: boolean): void;
}

}
declare module "babylonjs-node-editor/nodeGraphSystem/nodePort" {
import { Nullable } from "babylonjs/types";
import { Observer } from "babylonjs/Misc/observable";
import { Vector2 } from "babylonjs/Maths/math.vector";
import { GraphNode } from "babylonjs-node-editor/nodeGraphSystem/graphNode";
import { StateManager } from "babylonjs-node-editor/nodeGraphSystem/stateManager";
import { ISelectionChangedOptions } from "babylonjs-node-editor/nodeGraphSystem/interfaces/selectionChangedOptions";
import { FrameNodePort } from "babylonjs-node-editor/nodeGraphSystem/frameNodePort";
import { IDisplayManager } from "babylonjs-node-editor/nodeGraphSystem/interfaces/displayManager";
import { IPortData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/portData";
export class NodePort {
    portData: IPortData;
    node: GraphNode;
    protected _element: HTMLDivElement;
    protected _img: HTMLImageElement;
    protected _stateManager: StateManager;
    protected _portLabelElement: Element;
    protected _onCandidateLinkMovedObserver: Nullable<Observer<Nullable<Vector2>>>;
    protected _onSelectionChangedObserver: Nullable<Observer<Nullable<ISelectionChangedOptions>>>;
    protected _exposedOnFrame: boolean;
    delegatedPort: Nullable<FrameNodePort>;
    get element(): HTMLDivElement;
    get portName(): string;
    set portName(newName: string);
    get disabled(): boolean;
    hasLabel(): boolean;
    get exposedOnFrame(): boolean;
    set exposedOnFrame(value: boolean);
    get exposedPortPosition(): number;
    set exposedPortPosition(value: number);
    private _isConnectedToNodeOutsideOfFrame;
    refresh(): void;
    constructor(portContainer: HTMLElement, portData: IPortData, node: GraphNode, stateManager: StateManager);
    dispose(): void;
    static CreatePortElement(portData: IPortData, node: GraphNode, root: HTMLElement, displayManager: Nullable<IDisplayManager>, stateManager: StateManager): NodePort;
}

}
declare module "babylonjs-node-editor/nodeGraphSystem/propertyLedger" {
import { ComponentClass } from "react";
import { IPropertyComponentProps } from "babylonjs-node-editor/nodeGraphSystem/interfaces/propertyComponentProps";
export class PropertyLedger {
    static DefaultControl: ComponentClass<IPropertyComponentProps>;
    static RegisteredControls: {
        [key: string]: ComponentClass<IPropertyComponentProps>;
    };
}

}
declare module "babylonjs-node-editor/nodeGraphSystem/stateManager" {
import { Vector2 } from "babylonjs/Maths/math.vector";
import { Observable } from "babylonjs/Misc/observable";
import { Nullable } from "babylonjs/types";
import { FrameNodePort } from "babylonjs-node-editor/nodeGraphSystem/frameNodePort";
import { GraphFrame } from "babylonjs-node-editor/nodeGraphSystem/graphFrame";
import { GraphNode } from "babylonjs-node-editor/nodeGraphSystem/graphNode";
import { INodeContainer } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeContainer";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
import { IPortData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/portData";
import { ISelectionChangedOptions } from "babylonjs-node-editor/nodeGraphSystem/interfaces/selectionChangedOptions";
import { NodePort } from "babylonjs-node-editor/nodeGraphSystem/nodePort";
export class StateManager {
    data: any;
    hostDocument: Document;
    lockObject: any;
    onSelectionChangedObservable: Observable<Nullable<ISelectionChangedOptions>>;
    onFrameCreatedObservable: Observable<GraphFrame>;
    onUpdateRequiredObservable: Observable<any>;
    onGraphNodeRemovalObservable: Observable<GraphNode>;
    onSelectionBoxMoved: Observable<ClientRect | DOMRect>;
    onCandidateLinkMoved: Observable<Nullable<Vector2>>;
    onCandidatePortSelectedObservable: Observable<Nullable<FrameNodePort | NodePort>>;
    onNewNodeCreatedObservable: Observable<GraphNode>;
    onRebuildRequiredObservable: Observable<boolean>;
    onErrorMessageDialogRequiredObservable: Observable<string>;
    onExposePortOnFrameObservable: Observable<GraphNode>;
    onGridSizeChanged: Observable<void>;
    onNewBlockRequiredObservable: Observable<{
        type: string;
        targetX: number;
        targetY: number;
        needRepositioning?: boolean | undefined;
    }>;
    exportData: (data: any, frame?: Nullable<GraphFrame>) => string;
    isElbowConnectionAllowed: (nodeA: FrameNodePort | NodePort, nodeB: FrameNodePort | NodePort) => boolean;
    applyNodePortDesign: (data: IPortData, element: HTMLElement, img: HTMLImageElement) => void;
    storeEditorData: (serializationObject: any, frame?: Nullable<GraphFrame>) => void;
    getEditorDataMap: () => {
        [key: number]: number;
    };
    createDefaultInputData: (rootData: any, portData: IPortData, nodeContainer: INodeContainer) => {
        data: INodeData;
        name: string;
    };
}

}
declare module "babylonjs-node-editor/nodeGraphSystem/tools" {
import { GraphNode } from "babylonjs-node-editor/nodeGraphSystem/graphNode";
import { NodeLink } from "babylonjs-node-editor/nodeGraphSystem/nodeLink";
import { FramePortData } from "babylonjs-node-editor/nodeGraphSystem/types/framePortData";
export const IsFramePortData: (variableToCheck: any) => variableToCheck is FramePortData;
export const RefreshNode: (node: GraphNode, visitedNodes?: Set<GraphNode> | undefined, visitedLinks?: Set<NodeLink> | undefined) => void;

}
declare module "babylonjs-node-editor/nodeGraphSystem/typeLedger" {
import { INodeContainer } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeContainer";
import { INodeData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/nodeData";
import { IPortData } from "babylonjs-node-editor/nodeGraphSystem/interfaces/portData";
import { NodePort } from "babylonjs-node-editor/nodeGraphSystem/nodePort";
export class TypeLedger {
    static PortDataBuilder: (port: NodePort, nodeContainer: INodeContainer) => IPortData;
    static NodeDataBuilder: (data: any, nodeContainer: INodeContainer) => INodeData;
}

}
declare module "babylonjs-node-editor/nodeGraphSystem/types/framePortData" {
import { GraphFrame } from "babylonjs-node-editor/nodeGraphSystem/graphFrame";
import { FrameNodePort } from "babylonjs-node-editor/nodeGraphSystem/frameNodePort";
export type FramePortData = {
    frame: GraphFrame;
    port: FrameNodePort;
};
export {};

}
declare module "babylonjs-node-editor/propertyChangedEvent" {
export class PropertyChangedEvent {
    object: any;
    property: string;
    value: any;
    initialValue: any;
    allowNullValue?: boolean;
}

}
declare module "babylonjs-node-editor/stories/Button.stories" {
/// <reference types="react" />
import { ButtonProps } from "babylonjs-node-editor/components/Button";
const _default: {
    title: string;
    component: import("react").FC<ButtonProps>;
};
export default _default;
export const Default: any;
export const Wide: any;
export const Small: any;

}
declare module "babylonjs-node-editor/stories/Icon.stories" {
/// <reference types="react" />
import { IconProps } from "babylonjs-node-editor/components/Icon";
const _default: {
    title: string;
    component: import("react").FC<IconProps>;
};
export default _default;
export const Light: any;
export const Dark: any;

}
declare module "babylonjs-node-editor/stories/Label.stories" {
/// <reference types="react" />
import { LabelProps } from "babylonjs-node-editor/components/Label";
const _default: {
    title: string;
    component: import("react").FC<LabelProps>;
};
export default _default;
export const Default: any;

}
declare module "babylonjs-node-editor/stories/Toggle.stories" {
/// <reference types="react" />
import { ToggleProps } from "babylonjs-node-editor/components/Toggle";
const _default: {
    title: string;
    component: import("react").FC<ToggleProps>;
};
export default _default;
export const Default: any;
export const Padded: any;

}
declare module "babylonjs-node-editor/stringTools" {
export class StringTools {
    private static _SaveAs;
    private static _Click;
    /**
     * Download a string into a file that will be saved locally by the browser
     * @param document
     * @param content defines the string to download locally as a file
     * @param filename
     */
    static DownloadAsFile(document: HTMLDocument, content: string, filename: string): void;
}

}
declare module "babylonjs-node-editor/tabs/propertyGrids/gui/checkboxPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
import { Checkbox } from "babylonjs-gui/2D/controls/checkbox";
interface ICheckboxPropertyGridComponentProps {
    checkbox: Checkbox;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class CheckboxPropertyGridComponent extends React.Component<ICheckboxPropertyGridComponentProps> {
    constructor(props: ICheckboxPropertyGridComponentProps);
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/tabs/propertyGrids/gui/colorPickerPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { ColorPicker } from "babylonjs-gui/2D/controls/colorpicker";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface IColorPickerPropertyGridComponentProps {
    colorPicker: ColorPicker;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class ColorPickerPropertyGridComponent extends React.Component<IColorPickerPropertyGridComponentProps> {
    constructor(props: IColorPickerPropertyGridComponentProps);
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/tabs/propertyGrids/gui/commonControlPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { Control } from "babylonjs-gui/2D/controls/control";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface ICommonControlPropertyGridComponentProps {
    controls?: Control[];
    control?: Control;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class CommonControlPropertyGridComponent extends React.Component<ICommonControlPropertyGridComponentProps> {
    constructor(props: ICommonControlPropertyGridComponentProps);
    renderGridInformation(control: Control): JSX.Element | null;
    render(): JSX.Element | undefined;
}
export {};

}
declare module "babylonjs-node-editor/tabs/propertyGrids/gui/controlPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { Control } from "babylonjs-gui/2D/controls/control";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface IControlPropertyGridComponentProps {
    control: Control;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class ControlPropertyGridComponent extends React.Component<IControlPropertyGridComponentProps> {
    constructor(props: IControlPropertyGridComponentProps);
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/tabs/propertyGrids/gui/ellipsePropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
import { Ellipse } from "babylonjs-gui/2D/controls/ellipse";
interface IEllipsePropertyGridComponentProps {
    ellipse: Ellipse;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class EllipsePropertyGridComponent extends React.Component<IEllipsePropertyGridComponentProps> {
    constructor(props: IEllipsePropertyGridComponentProps);
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/tabs/propertyGrids/gui/gridPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
import { Grid } from "babylonjs-gui/2D/controls/grid";
interface IGridPropertyGridComponentProps {
    grid: Grid;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class GridPropertyGridComponent extends React.Component<IGridPropertyGridComponentProps> {
    constructor(props: IGridPropertyGridComponentProps);
    renderRows(): JSX.Element[];
    renderColumns(): JSX.Element[];
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/tabs/propertyGrids/gui/imageBasedSliderPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
import { ImageBasedSlider } from "babylonjs-gui/2D/controls/sliders/imageBasedSlider";
interface IImageBasedSliderPropertyGridComponentProps {
    imageBasedSlider: ImageBasedSlider;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class ImageBasedSliderPropertyGridComponent extends React.Component<IImageBasedSliderPropertyGridComponentProps> {
    constructor(props: IImageBasedSliderPropertyGridComponentProps);
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/tabs/propertyGrids/gui/imagePropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
import { Image } from "babylonjs-gui/2D/controls/image";
interface IImagePropertyGridComponentProps {
    image: Image;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class ImagePropertyGridComponent extends React.Component<IImagePropertyGridComponentProps> {
    constructor(props: IImagePropertyGridComponentProps);
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/tabs/propertyGrids/gui/inputTextPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { InputText } from "babylonjs-gui/2D/controls/inputText";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface IInputTextPropertyGridComponentProps {
    inputText: InputText;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class InputTextPropertyGridComponent extends React.Component<IInputTextPropertyGridComponentProps> {
    constructor(props: IInputTextPropertyGridComponentProps);
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/tabs/propertyGrids/gui/linePropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
import { Line } from "babylonjs-gui/2D/controls/line";
interface ILinePropertyGridComponentProps {
    line: Line;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class LinePropertyGridComponent extends React.Component<ILinePropertyGridComponentProps> {
    constructor(props: ILinePropertyGridComponentProps);
    onDashChange(value: string): void;
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/tabs/propertyGrids/gui/radioButtonPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
import { RadioButton } from "babylonjs-gui/2D/controls/radioButton";
interface IRadioButtonPropertyGridComponentProps {
    radioButtons: RadioButton[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class RadioButtonPropertyGridComponent extends React.Component<IRadioButtonPropertyGridComponentProps> {
    constructor(props: IRadioButtonPropertyGridComponentProps);
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/tabs/propertyGrids/gui/rectanglePropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
import { Rectangle } from "babylonjs-gui/2D/controls/rectangle";
interface IRectanglePropertyGridComponentProps {
    rectangle: Rectangle;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class RectanglePropertyGridComponent extends React.Component<IRectanglePropertyGridComponentProps> {
    constructor(props: IRectanglePropertyGridComponentProps);
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/tabs/propertyGrids/gui/scrollViewerPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
import { ScrollViewer } from "babylonjs-gui/2D/controls/scrollViewers/scrollViewer";
interface IScrollViewerPropertyGridComponentProps {
    scrollViewer: ScrollViewer;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class ScrollViewerPropertyGridComponent extends React.Component<IScrollViewerPropertyGridComponentProps> {
    constructor(props: IScrollViewerPropertyGridComponentProps);
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/tabs/propertyGrids/gui/sliderPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
import { Slider } from "babylonjs-gui/2D/controls/sliders/slider";
interface ISliderPropertyGridComponentProps {
    slider: Slider;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class SliderPropertyGridComponent extends React.Component<ISliderPropertyGridComponentProps> {
    constructor(props: ISliderPropertyGridComponentProps);
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/tabs/propertyGrids/gui/stackPanelPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
import { StackPanel } from "babylonjs-gui/2D/controls/stackPanel";
interface IStackPanelPropertyGridComponentProps {
    stackPanel: StackPanel;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class StackPanelPropertyGridComponent extends React.Component<IStackPanelPropertyGridComponentProps> {
    constructor(props: IStackPanelPropertyGridComponentProps);
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/tabs/propertyGrids/gui/textBlockPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-node-editor/propertyChangedEvent";
import { TextBlock } from "babylonjs-gui/2D/controls/textBlock";
import { LockObject } from "babylonjs-node-editor/tabs/propertyGrids/lockObject";
interface ITextBlockPropertyGridComponentProps {
    textBlock: TextBlock;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class TextBlockPropertyGridComponent extends React.Component<ITextBlockPropertyGridComponentProps> {
    constructor(props: ITextBlockPropertyGridComponentProps);
    render(): JSX.Element;
}
export {};

}
declare module "babylonjs-node-editor/tabs/propertyGrids/lockObject" {
/**
 * Class used to provide lock mechanism
 */
export class LockObject {
    /**
     * Gets or set if the lock is engaged
     */
    lock: boolean;
}

}

declare module "babylonjs-node-editor" {
    export * from "babylonjs-node-editor/legacy/legacy";
}


declare module BABYLON.NodeEditor {
    export class BlockTools {
        static GetBlockFromString(data: string, scene: BABYLON.Scene, nodeMaterial: BABYLON.NodeMaterial): BABYLON.ElbowBlock | BABYLON.TwirlBlock | BABYLON.VoronoiNoiseBlock | BABYLON.ScreenSpaceBlock | BABYLON.CloudBlock | BABYLON.MatrixBuilderBlock | BABYLON.DesaturateBlock | BABYLON.RefractBlock | BABYLON.ReflectBlock | BABYLON.DerivativeBlock | BABYLON.Rotate2dBlock | BABYLON.NormalBlendBlock | BABYLON.WorleyNoise3DBlock | BABYLON.SimplexPerlin3DBlock | BABYLON.BonesBlock | BABYLON.InstancesBlock | BABYLON.MorphTargetsBlock | BABYLON.DiscardBlock | BABYLON.ImageProcessingBlock | BABYLON.ColorMergerBlock | BABYLON.VectorMergerBlock | BABYLON.ColorSplitterBlock | BABYLON.VectorSplitterBlock | BABYLON.TextureBlock | BABYLON.ReflectionTextureBlock | BABYLON.LightBlock | BABYLON.FogBlock | BABYLON.VertexOutputBlock | BABYLON.FragmentOutputBlock | BABYLON.AddBlock | BABYLON.ClampBlock | BABYLON.ScaleBlock | BABYLON.CrossBlock | BABYLON.DotBlock | BABYLON.PowBlock | BABYLON.MultiplyBlock | BABYLON.TransformBlock | BABYLON.TrigonometryBlock | BABYLON.RemapBlock | BABYLON.NormalizeBlock | BABYLON.FresnelBlock | BABYLON.LerpBlock | BABYLON.NLerpBlock | BABYLON.DivideBlock | BABYLON.SubtractBlock | BABYLON.ModBlock | BABYLON.StepBlock | BABYLON.SmoothStepBlock | BABYLON.OneMinusBlock | BABYLON.ReciprocalBlock | BABYLON.ViewDirectionBlock | BABYLON.LightInformationBlock | BABYLON.MaxBlock | BABYLON.MinBlock | BABYLON.LengthBlock | BABYLON.DistanceBlock | BABYLON.NegateBlock | BABYLON.PerturbNormalBlock | BABYLON.TBNBlock | BABYLON.RandomNumberBlock | BABYLON.ReplaceColorBlock | BABYLON.PosterizeBlock | BABYLON.ArcTan2Block | BABYLON.GradientBlock | BABYLON.FrontFacingBlock | BABYLON.WaveBlock | BABYLON.InputBlock | BABYLON.PBRMetallicRoughnessBlock | BABYLON.SheenBlock | BABYLON.AnisotropyBlock | BABYLON.ReflectionBlock | BABYLON.ClearCoatBlock | BABYLON.RefractionBlock | BABYLON.SubSurfaceBlock | BABYLON.CurrentScreenBlock | BABYLON.ParticleTextureBlock | BABYLON.ParticleRampGradientBlock | BABYLON.ParticleBlendMultiplyBlock | BABYLON.FragCoordBlock | BABYLON.ScreenSizeBlock | BABYLON.SceneDepthBlock | BABYLON.ConditionalBlock | BABYLON.ImageSourceBlock | BABYLON.ClipPlanesBlock | null;
        static GetColorFromConnectionNodeType(type: BABYLON.NodeMaterialBlockConnectionPointTypes): string;
        static GetConnectionNodeTypeFromString(type: string): BABYLON.NodeMaterialBlockConnectionPointTypes.Float | BABYLON.NodeMaterialBlockConnectionPointTypes.Vector2 | BABYLON.NodeMaterialBlockConnectionPointTypes.Vector3 | BABYLON.NodeMaterialBlockConnectionPointTypes.Vector4 | BABYLON.NodeMaterialBlockConnectionPointTypes.Color3 | BABYLON.NodeMaterialBlockConnectionPointTypes.Color4 | BABYLON.NodeMaterialBlockConnectionPointTypes.Matrix | BABYLON.NodeMaterialBlockConnectionPointTypes.AutoDetect;
        static GetStringFromConnectionNodeType(type: BABYLON.NodeMaterialBlockConnectionPointTypes): "" | "Float" | "Vector2" | "Vector3" | "Vector4" | "Matrix" | "Color3" | "Color4";
    }


    interface ILogComponentProps {
        globalState: GlobalState;
    }
    export class LogEntry {
        message: string;
        isError: boolean;
        time: Date;
        constructor(message: string, isError: boolean);
    }
    export class LogComponent extends React.Component<ILogComponentProps, {
        logs: LogEntry[];
    }> {
        constructor(props: ILogComponentProps);
        componentDidMount(): void;
        componentDidUpdate(): void;
        render(): JSX.Element;
    }


    interface INodeListComponentProps {
        globalState: GlobalState;
    }
    export class NodeListComponent extends React.Component<INodeListComponentProps, {
        filter: string;
    }> {
        private _onResetRequiredObserver;
        private static _Tooltips;
        private _customFrameList;
        private _customBlockList;
        constructor(props: INodeListComponentProps);
        componentWillUnmount(): void;
        filterContent(filter: string): void;
        loadCustomFrame(file: File): void;
        removeItem(value: string): void;
        loadCustomBlock(file: File): void;
        removeCustomBlock(value: string): void;
        render(): JSX.Element;
    }


    interface IPreviewAreaComponentProps {
        globalState: GlobalState;
        width: number;
    }
    export class PreviewAreaComponent extends React.Component<IPreviewAreaComponentProps, {
        isLoading: boolean;
    }> {
        private _onIsLoadingChangedObserver;
        private _onResetRequiredObserver;
        constructor(props: IPreviewAreaComponentProps);
        componentWillUnmount(): void;
        changeBackFaceCulling(value: boolean): void;
        changeDepthPrePass(value: boolean): void;
        _onPointerOverCanvas: () => void;
        _onPointerOutCanvas: () => void;
        changeParticleSystemBlendMode(newOne: number): void;
        render(): JSX.Element;
    }


    export class PreviewManager {
        private _nodeMaterial;
        private _onBuildObserver;
        private _onPreviewCommandActivatedObserver;
        private _onAnimationCommandActivatedObserver;
        private _onUpdateRequiredObserver;
        private _onPreviewBackgroundChangedObserver;
        private _onBackFaceCullingChangedObserver;
        private _onDepthPrePassChangedObserver;
        private _onLightUpdatedObserver;
        private _engine;
        private _scene;
        private _meshes;
        private _camera;
        private _material;
        private _globalState;
        private _currentType;
        private _lightParent;
        private _postprocess;
        private _proceduralTexture;
        private _particleSystem;
        private _layer;
        constructor(targetCanvas: HTMLCanvasElement, globalState: GlobalState);
        private _handleAnimations;
        private _prepareLights;
        private _prepareScene;
        private _refreshPreviewMesh;
        private _loadParticleSystem;
        private _forceCompilationAsync;
        private _updatePreview;
        dispose(): void;
    }


    interface IPreviewMeshControlComponent {
        globalState: GlobalState;
        togglePreviewAreaComponent: () => void;
    }
    export class PreviewMeshControlComponent extends React.Component<IPreviewMeshControlComponent> {
        private _colorInputRef;
        private _filePickerRef;
        private _onResetRequiredObserver;
        constructor(props: IPreviewMeshControlComponent);
        componentWillUnmount(): void;
        changeMeshType(newOne: PreviewType): void;
        useCustomMesh(evt: any): void;
        onPopUp(): void;
        changeAnimation(): void;
        changeBackground(value: string): void;
        changeBackgroundClick(): void;
        render(): JSX.Element;
    }


    export enum PreviewType {
        Sphere = 0,
        Box = 1,
        Torus = 2,
        Cylinder = 3,
        Plane = 4,
        ShaderBall = 5,
        DefaultParticleSystem = 6,
        Bubbles = 7,
        Smoke = 8,
        Rain = 9,
        Explosion = 10,
        Fire = 11,
        Custom = 12
    }


    interface IInputsPropertyTabComponentProps {
        globalState: GlobalState;
        inputs: BABYLON.InputBlock[];
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
    }
    export class InputsPropertyTabComponent extends React.Component<IInputsPropertyTabComponentProps> {
        constructor(props: IInputsPropertyTabComponentProps);
        processInputBlockUpdate(ib: BABYLON.InputBlock): void;
        renderInputBlock(block: BABYLON.InputBlock): JSX.Element | null;
        render(): JSX.Element;
    }


    interface IColor3PropertyTabComponentProps {
        globalState: GlobalState;
        inputBlock: BABYLON.InputBlock;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
    }
    export class Color3PropertyTabComponent extends React.Component<IColor3PropertyTabComponentProps> {
        render(): JSX.Element;
    }


    interface IColor4PropertyTabComponentProps {
        globalState: GlobalState;
        inputBlock: BABYLON.InputBlock;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
    }
    export class Color4PropertyTabComponent extends React.Component<IColor4PropertyTabComponentProps> {
        render(): JSX.Element;
    }


    interface IFloatPropertyTabComponentProps {
        globalState: GlobalState;
        inputBlock: BABYLON.InputBlock;
    }
    export class FloatPropertyTabComponent extends React.Component<IFloatPropertyTabComponentProps> {
        render(): JSX.Element;
    }


    interface IMatrixPropertyTabComponentProps {
        globalState: GlobalState;
        inputBlock: BABYLON.InputBlock;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
    }
    export class MatrixPropertyTabComponent extends React.Component<IMatrixPropertyTabComponentProps> {
        render(): JSX.Element;
    }


    interface IVector2PropertyTabComponentProps {
        globalState: GlobalState;
        inputBlock: BABYLON.InputBlock;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
    }
    export class Vector2PropertyTabComponent extends React.Component<IVector2PropertyTabComponentProps> {
        render(): JSX.Element;
    }


    interface IVector3PropertyTabComponentProps {
        globalState: GlobalState;
        inputBlock: BABYLON.InputBlock;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
    }
    export class Vector3PropertyTabComponent extends React.Component<IVector3PropertyTabComponentProps> {
        render(): JSX.Element;
    }


    interface IVector4PropertyTabComponentProps {
        globalState: GlobalState;
        inputBlock: BABYLON.InputBlock;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
    }
    export class Vector4PropertyTabComponent extends React.Component<IVector4PropertyTabComponentProps> {
        render(): JSX.Element;
    }


    interface IPropertyTabComponentProps {
        globalState: GlobalState;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
    }
    interface IPropertyTabComponentState {
        currentNode: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.GraphNode>;
        currentFrame: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.GraphFrame>;
        currentFrameNodePort: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.FrameNodePort>;
        currentNodePort: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.NodePort>;
        uploadInProgress: boolean;
    }
    export class PropertyTabComponent extends React.Component<IPropertyTabComponentProps, IPropertyTabComponentState> {
        private _onBuiltObserver;
        private _modeSelect;
        constructor(props: IPropertyTabComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        processInputBlockUpdate(ib: BABYLON.InputBlock): void;
        renderInputBlock(block: BABYLON.InputBlock): JSX.Element | null;
        load(file: File): void;
        loadFrame(file: File): void;
        save(): void;
        customSave(): void;
        saveToSnippetServer(): void;
        loadFromSnippet(): void;
        changeMode(value: any, force?: boolean, loadDefault?: boolean): boolean;
        render(): JSX.Element;
    }


    export class GlobalState {
        nodeMaterial: BABYLON.NodeMaterial;
        hostElement: HTMLElement;
        hostDocument: Document;
        hostWindow: Window;
        stateManager: BABYLON.NodeEditor.SharedUIComponents.StateManager;
        onBuiltObservable: BABYLON.Observable<void>;
        onResetRequiredObservable: BABYLON.Observable<boolean>;
        onZoomToFitRequiredObservable: BABYLON.Observable<void>;
        onReOrganizedRequiredObservable: BABYLON.Observable<void>;
        onLogRequiredObservable: BABYLON.Observable<LogEntry>;
        onIsLoadingChanged: BABYLON.Observable<boolean>;
        onPreviewCommandActivated: BABYLON.Observable<boolean>;
        onLightUpdated: BABYLON.Observable<void>;
        onPreviewBackgroundChanged: BABYLON.Observable<void>;
        onBackFaceCullingChanged: BABYLON.Observable<void>;
        onDepthPrePassChanged: BABYLON.Observable<void>;
        onAnimationCommandActivated: BABYLON.Observable<void>;
        onImportFrameObservable: BABYLON.Observable<any>;
        onPopupClosedObservable: BABYLON.Observable<void>;
        onGetNodeFromBlock: (block: BABYLON.NodeMaterialBlock) => BABYLON.NodeEditor.SharedUIComponents.GraphNode;
        previewType: PreviewType;
        previewFile: File;
        particleSystemBlendMode: number;
        listOfCustomPreviewFiles: File[];
        rotatePreview: boolean;
        backgroundColor: BABYLON.Color4;
        backFaceCulling: boolean;
        depthPrePass: boolean;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        hemisphericLight: boolean;
        directionalLight0: boolean;
        directionalLight1: boolean;
        controlCamera: boolean;
        _mode: BABYLON.NodeMaterialModes;
        pointerOverCanvas: boolean;
        /** Gets the mode */
        get mode(): BABYLON.NodeMaterialModes;
        /** Sets the mode */
        set mode(m: BABYLON.NodeMaterialModes);
        customSave?: {
            label: string;
            action: (data: string) => Promise<void>;
        };
        constructor();
        storeEditorData(serializationObject: any, frame?: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.GraphFrame>): void;
    }


    interface IGraphEditorProps {
        globalState: GlobalState;
    }
    interface IGraphEditorState {
        showPreviewPopUp: boolean;
    }
    interface IInternalPreviewAreaOptions extends BABYLON.IInspectorOptions {
        popup: boolean;
        original: boolean;
        explorerWidth?: string;
        inspectorWidth?: string;
        embedHostWidth?: string;
    }
    export class GraphEditor extends React.Component<IGraphEditorProps, IGraphEditorState> {
        private _graphCanvasRef;
        private _diagramContainerRef;
        private _graphCanvas;
        private _diagramContainer;
        private _startX;
        private _moveInProgress;
        private _leftWidth;
        private _rightWidth;
        private _previewManager;
        private _mouseLocationX;
        private _mouseLocationY;
        private _onWidgetKeyUpPointer;
        private _previewHost;
        private _popUpWindow;
        appendBlock(dataToAppend: BABYLON.NodeMaterialBlock | BABYLON.NodeEditor.SharedUIComponents.INodeData, recursion?: boolean): BABYLON.NodeEditor.SharedUIComponents.GraphNode;
        addValueNode(type: string): BABYLON.NodeEditor.SharedUIComponents.GraphNode;
        componentDidMount(): void;
        componentWillUnmount(): void;
        constructor(props: IGraphEditorProps);
        zoomToFit(): void;
        buildMaterial(autoConfigure?: boolean): void;
        build(ignoreEditorData?: boolean): void;
        loadGraph(): void;
        showWaitScreen(): void;
        hideWaitScreen(): void;
        reOrganize(editorData?: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.IEditorData>, isImportingAFrame?: boolean): void;
        onPointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
        onPointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
        onWheel: (evt: WheelEvent) => void;
        resizeColumns(evt: React.PointerEvent<HTMLDivElement>, forLeft?: boolean): void;
        buildColumnLayout(): string;
        emitNewBlock(blockType: string, targetX: number, targetY: number): void;
        dropNewBlock(event: React.DragEvent<HTMLDivElement>): void;
        handlePopUp: () => void;
        handleClosingPopUp: () => void;
        initiatePreviewArea: (canvas?: HTMLCanvasElement) => void;
        createPopUp: () => void;
        createPopupWindow: (title: string, windowVariableName: string, width?: number, height?: number) => Window | null;
        createPreviewMeshControlHost: (options: IInternalPreviewAreaOptions, parentControl: BABYLON.Nullable<HTMLElement>) => void;
        createPreviewHost: (options: IInternalPreviewAreaOptions, parentControl: BABYLON.Nullable<HTMLElement>) => void;
        fixPopUpStyles: (document: Document) => void;
        render(): JSX.Element;
    }


    export class BlockNodeData implements BABYLON.NodeEditor.SharedUIComponents.INodeData {
        data: BABYLON.NodeMaterialBlock;
        private _inputs;
        private _outputs;
        get uniqueId(): number;
        get name(): string;
        getClassName(): string;
        get isInput(): boolean;
        get inputs(): BABYLON.NodeEditor.SharedUIComponents.IPortData[];
        get outputs(): BABYLON.NodeEditor.SharedUIComponents.IPortData[];
        get comments(): string;
        set comments(value: string);
        getPortByName(name: string): BABYLON.NodeEditor.SharedUIComponents.IPortData | null;
        dispose(): void;
        prepareHeaderIcon(iconDiv: HTMLDivElement, img: HTMLImageElement): void;
        constructor(data: BABYLON.NodeMaterialBlock, nodeContainer: BABYLON.NodeEditor.SharedUIComponents.INodeContainer);
    }


    export class ConnectionPointPortData implements BABYLON.NodeEditor.SharedUIComponents.IPortData {
        private _connectedPort;
        private _nodeContainer;
        data: BABYLON.NodeMaterialConnectionPoint;
        get name(): string;
        get internalName(): string;
        get isExposedOnFrame(): boolean;
        set isExposedOnFrame(value: boolean);
        get exposedPortPosition(): number;
        set exposedPortPosition(value: number);
        get isConnected(): boolean;
        get connectedPort(): BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.IPortData>;
        set connectedPort(value: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.IPortData>);
        get direction(): BABYLON.NodeEditor.SharedUIComponents.PortDataDirection;
        get ownerData(): import("core/Materials/Node/nodeMaterialBlock").NodeMaterialBlock;
        get needDualDirectionValidation(): boolean;
        get hasEndpoints(): boolean;
        get endpoints(): BABYLON.NodeEditor.SharedUIComponents.IPortData[];
        constructor(connectionPoint: BABYLON.NodeMaterialConnectionPoint, nodeContainer: BABYLON.NodeEditor.SharedUIComponents.INodeContainer);
        updateDisplayName(newName: string): void;
        connectTo(port: BABYLON.NodeEditor.SharedUIComponents.IPortData): void;
        canConnectTo(port: BABYLON.NodeEditor.SharedUIComponents.IPortData): boolean;
        disconnectFrom(port: BABYLON.NodeEditor.SharedUIComponents.IPortData): void;
        checkCompatibilityState(port: BABYLON.NodeEditor.SharedUIComponents.IPortData): 0 | BABYLON.NodeMaterialConnectionPointCompatibilityStates.TypeIncompatible | BABYLON.NodeMaterialConnectionPointCompatibilityStates.TargetIncompatible | BABYLON.NodeMaterialConnectionPointCompatibilityStates.HierarchyIssue;
        getCompatibilityIssueMessage(issue: number, targetNode: BABYLON.NodeEditor.SharedUIComponents.GraphNode, targetPort: BABYLON.NodeEditor.SharedUIComponents.IPortData): "" | "Cannot connect two different connection types" | "Source block can only work in fragment shader whereas destination block is currently aimed for the vertex shader" | "Source block cannot be connected with one of its ancestors";
    }


    export class ClampDisplayManager implements BABYLON.NodeEditor.SharedUIComponents.IDisplayManager {
        getHeaderClass(): string;
        shouldDisplayPortLabels(): boolean;
        getHeaderText(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData): string;
        getBackgroundColor(): string;
        updatePreviewContent(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
    }


    export class ConditionalDisplayManager implements BABYLON.NodeEditor.SharedUIComponents.IDisplayManager {
        getHeaderClass(): string;
        shouldDisplayPortLabels(): boolean;
        getHeaderText(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData): string;
        getBackgroundColor(): string;
        updatePreviewContent(): void;
    }


    export class DiscardDisplayManager implements BABYLON.NodeEditor.SharedUIComponents.IDisplayManager {
        getHeaderClass(): string;
        shouldDisplayPortLabels(): boolean;
        getHeaderText(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData): string;
        getBackgroundColor(): string;
        updatePreviewContent(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
    }


    export class ElbowDisplayManager implements BABYLON.NodeEditor.SharedUIComponents.IDisplayManager {
        getHeaderClass(): string;
        shouldDisplayPortLabels(): boolean;
        getHeaderText(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData): string;
        getBackgroundColor(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData): string;
        updatePreviewContent(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
    }


    export class GradientDisplayManager implements BABYLON.NodeEditor.SharedUIComponents.IDisplayManager {
        getHeaderClass(): string;
        shouldDisplayPortLabels(): boolean;
        getHeaderText(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData): string;
        getBackgroundColor(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData): string;
        updatePreviewContent(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
    }


    export class ImageSourceDisplayManager implements BABYLON.NodeEditor.SharedUIComponents.IDisplayManager {
        private _previewCanvas;
        private _previewImage;
        getHeaderClass(): string;
        shouldDisplayPortLabels(): boolean;
        getHeaderText(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData): string;
        getBackgroundColor(): string;
        updatePreviewContent(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
    }


    export class InputDisplayManager implements BABYLON.NodeEditor.SharedUIComponents.IDisplayManager {
        getHeaderClass(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData): "" | "constant" | "inspector";
        shouldDisplayPortLabels(): boolean;
        getHeaderText(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData): string;
        static GetBaseType(type: BABYLON.NodeMaterialBlockConnectionPointTypes): string;
        getBackgroundColor(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData): string;
        updatePreviewContent(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
    }


    export class OutputDisplayManager implements BABYLON.NodeEditor.SharedUIComponents.IDisplayManager {
        getHeaderClass(): string;
        shouldDisplayPortLabels(): boolean;
        getHeaderText(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData): string;
        getBackgroundColor(): string;
        updatePreviewContent(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
    }


    export class PBRDisplayManager implements BABYLON.NodeEditor.SharedUIComponents.IDisplayManager {
        getHeaderClass(): string;
        shouldDisplayPortLabels(): boolean;
        getHeaderText(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData): string;
        getBackgroundColor(): string;
        updatePreviewContent(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
    }


    export class RemapDisplayManager implements BABYLON.NodeEditor.SharedUIComponents.IDisplayManager {
        getHeaderClass(): string;
        shouldDisplayPortLabels(): boolean;
        getHeaderText(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData): string;
        getBackgroundColor(): string;
        private _extractInputValue;
        updatePreviewContent(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
    }


    export class TextureDisplayManager implements BABYLON.NodeEditor.SharedUIComponents.IDisplayManager {
        private _previewCanvas;
        private _previewImage;
        getHeaderClass(): string;
        shouldDisplayPortLabels(): boolean;
        getHeaderText(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData): string;
        getBackgroundColor(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData): string;
        updatePreviewContent(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
    }


    export class TrigonometryDisplayManager implements BABYLON.NodeEditor.SharedUIComponents.IDisplayManager {
        getHeaderClass(): string;
        shouldDisplayPortLabels(): boolean;
        getHeaderText(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData): string;
        getBackgroundColor(): string;
        updatePreviewContent(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
    }


    export class ColorMergerPropertyTabComponent extends React.Component<BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps> {
        constructor(props: BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps);
        render(): JSX.Element;
    }


    export class ConditionalPropertyTabComponent extends React.Component<BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps> {
        constructor(props: BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps);
        render(): JSX.Element;
    }


    export interface IFrameNodePortPropertyTabComponentProps {
        stateManager: BABYLON.NodeEditor.SharedUIComponents.StateManager;
        globalState: GlobalState;
        frameNodePort: BABYLON.NodeEditor.SharedUIComponents.FrameNodePort;
        frame: BABYLON.NodeEditor.SharedUIComponents.GraphFrame;
    }
    export class FrameNodePortPropertyTabComponent extends React.Component<IFrameNodePortPropertyTabComponentProps, {
        port: BABYLON.NodeEditor.SharedUIComponents.FrameNodePort;
    }> {
        private _onFramePortPositionChangedObserver;
        private _onSelectionChangedObserver;
        constructor(props: IFrameNodePortPropertyTabComponentProps);
        componentWillUnmount(): void;
        render(): JSX.Element;
    }


    export interface IFramePropertyTabComponentProps {
        globalState: GlobalState;
        frame: BABYLON.NodeEditor.SharedUIComponents.GraphFrame;
    }
    export class FramePropertyTabComponent extends React.Component<IFramePropertyTabComponentProps> {
        private _onFrameExpandStateChangedObserver;
        constructor(props: IFramePropertyTabComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        render(): JSX.Element;
    }


    export class GenericPropertyComponent extends React.Component<BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps> {
        constructor(props: BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps);
        render(): JSX.Element;
    }
    export class GeneralPropertyTabComponent extends React.Component<BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps> {
        constructor(props: BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps);
        render(): JSX.Element;
    }
    export class GenericPropertyTabComponent extends React.Component<BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps> {
        constructor(props: BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps);
        forceRebuild(notifiers?: {
            rebuild?: boolean;
            update?: boolean;
            activatePreviewCommand?: boolean;
            callback?: (scene: BABYLON.Scene) => void;
        }): void;
        render(): JSX.Element;
    }


    export class GradientPropertyTabComponent extends React.Component<BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps> {
        private _onValueChangedObserver;
        constructor(props: BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        forceRebuild(): void;
        deleteStep(step: BABYLON.GradientBlockColorStep): void;
        copyStep(step: BABYLON.GradientBlockColorStep): void;
        addNewStep(): void;
        checkForReOrder(): void;
        render(): JSX.Element;
    }


    interface IGradientStepComponentProps {
        stateManager: BABYLON.NodeEditor.SharedUIComponents.StateManager;
        step: BABYLON.GradientBlockColorStep;
        lineIndex: number;
        onDelete: () => void;
        onUpdateStep: () => void;
        onCheckForReOrder: () => void;
        onCopy?: () => void;
    }
    export class GradientStepComponent extends React.Component<IGradientStepComponentProps, {
        gradient: number;
    }> {
        constructor(props: IGradientStepComponentProps);
        updateColor(color: string): void;
        updateStep(gradient: number): void;
        onPointerUp(): void;
        render(): JSX.Element;
    }


    export class ImageSourcePropertyTabComponent extends React.Component<BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps, {
        isEmbedded: boolean;
    }> {
        get imageSourceBlock(): BABYLON.ImageSourceBlock;
        constructor(props: BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps);
        UNSAFE_componentWillUpdate(nextProps: BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps, nextState: {
            isEmbedded: boolean;
            loadAsCubeTexture: boolean;
        }): void;
        private _generateRandomForCache;
        updateAfterTextureLoad(): void;
        removeTexture(): void;
        _prepareTexture(): void;
        /**
         * Replaces the texture of the node
         * @param file the file of the texture to use
         */
        replaceTexture(file: File): void;
        replaceTextureWithUrl(url: string): void;
        render(): JSX.Element;
    }


    export class InputPropertyTabComponent extends React.Component<BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps> {
        private _onValueChangedObserver;
        constructor(props: BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        renderValue(globalState: GlobalState): JSX.Element | null;
        setDefaultValue(): void;
        render(): JSX.Element;
    }


    export class LightInformationPropertyTabComponent extends React.Component<BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps> {
        render(): JSX.Element;
    }


    export class LightPropertyTabComponent extends React.Component<BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps> {
        render(): JSX.Element;
    }


    export interface IFrameNodePortPropertyTabComponentProps {
        stateManager: BABYLON.NodeEditor.SharedUIComponents.StateManager;
        nodePort: BABYLON.NodeEditor.SharedUIComponents.NodePort;
    }
    export class NodePortPropertyTabComponent extends React.Component<IFrameNodePortPropertyTabComponentProps> {
        private _onSelectionChangedObserver;
        constructor(props: IFrameNodePortPropertyTabComponentProps);
        componentWillUnmount(): void;
        toggleExposeOnFrame(value: boolean): void;
        render(): JSX.Element;
    }


    type ReflectionTexture = BABYLON.ReflectionTextureBlock | BABYLON.ReflectionBlock | BABYLON.RefractionBlock;
    type AnyTexture = BABYLON.TextureBlock | ReflectionTexture | BABYLON.CurrentScreenBlock | BABYLON.ParticleTextureBlock;
    export class TexturePropertyTabComponent extends React.Component<BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps, {
        isEmbedded: boolean;
        loadAsCubeTexture: boolean;
        textureIsPrefiltered: boolean;
    }> {
        get textureBlock(): AnyTexture;
        constructor(props: BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps);
        UNSAFE_componentWillUpdate(nextProps: BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps, nextState: {
            isEmbedded: boolean;
            loadAsCubeTexture: boolean;
        }): void;
        private _generateRandomForCache;
        updateAfterTextureLoad(): void;
        removeTexture(): void;
        _prepareTexture(): void;
        /**
         * Replaces the texture of the node
         * @param file the file of the texture to use
         */
        replaceTexture(file: File): void;
        replaceTextureWithUrl(url: string): void;
        render(): JSX.Element;
    }


    export class TransformPropertyTabComponent extends React.Component<BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps> {
        constructor(props: BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps);
        render(): JSX.Element;
    }


    export class TrigonometryPropertyTabComponent extends React.Component<BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps> {
        constructor(props: BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps);
        render(): JSX.Element;
    }


    export class VectorMergerPropertyTabComponent extends React.Component<BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps> {
        constructor(props: BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps);
        render(): JSX.Element;
    }


    export const RegisterDefaultInput: (stateManager: BABYLON.NodeEditor.SharedUIComponents.StateManager) => void;


    export const RegisterElbowSupport: (stateManager: BABYLON.NodeEditor.SharedUIComponents.StateManager) => void;


    export const RegisterExportData: (stateManager: BABYLON.NodeEditor.SharedUIComponents.StateManager) => void;


    export const RegisterNodePortDesign: (stateManager: BABYLON.NodeEditor.SharedUIComponents.StateManager) => void;


    export const RegisterToDisplayManagers: () => void;


    export const RegisterToPropertyTabManagers: () => void;


    export const RegisterTypeLedger: () => void;




    /**
     * Interface used to specify creation options for the node editor
     */
    export interface INodeEditorOptions {
        nodeMaterial: BABYLON.NodeMaterial;
        hostElement?: HTMLElement;
        customSave?: {
            label: string;
            action: (data: string) => Promise<void>;
        };
        customLoadObservable?: BABYLON.Observable<any>;
    }
    /**
     * Class used to create a node editor
     */
    export class NodeEditor {
        private static _CurrentState;
        /**
         * Show the node editor
         * @param options defines the options to use to configure the node editor
         */
        static Show(options: INodeEditorOptions): void;
    }


    interface IPortalProps {
        globalState: GlobalState;
    }
    export class Portal extends React.Component<IPortalProps> {
        render(): React.ReactPortal;
    }


    export class SerializationTools {
        static UpdateLocations(material: BABYLON.NodeMaterial, globalState: GlobalState, frame?: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.GraphFrame>): void;
        static Serialize(material: BABYLON.NodeMaterial, globalState: GlobalState, frame?: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.GraphFrame>): string;
        static Deserialize(serializationObject: any, globalState: GlobalState): void;
        static AddFrameToMaterial(serializationObject: any, globalState: GlobalState, currentMaterial: BABYLON.NodeMaterial): void;
    }


    export interface ICheckBoxLineComponentProps {
        label: string;
        target?: any;
        propertyName?: string;
        isSelected?: () => boolean;
        onSelect?: (value: boolean) => void;
        onValueChanged?: () => void;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
        disabled?: boolean;
    }
    export class CheckBoxLineComponent extends React.Component<ICheckBoxLineComponentProps, {
        isSelected: boolean;
        isDisabled?: boolean;
    }> {
        private static _UniqueIdSeed;
        private _uniqueId;
        private _localChange;
        constructor(props: ICheckBoxLineComponentProps);
        shouldComponentUpdate(nextProps: ICheckBoxLineComponentProps, nextState: {
            isSelected: boolean;
            isDisabled: boolean;
        }): boolean;
        onChange(): void;
        render(): JSX.Element;
    }


    export interface IButtonLineComponentProps {
        data: string;
        tooltip: string;
    }
    export class DraggableLineComponent extends React.Component<IButtonLineComponentProps> {
        constructor(props: IButtonLineComponentProps);
        render(): JSX.Element;
    }


    export interface IDraggableLineWithButtonComponent {
        data: string;
        tooltip: string;
        iconImage: any;
        onIconClick: (value: string) => void;
        iconTitle: string;
        lenSuffixToRemove?: number;
    }
    export class DraggableLineWithButtonComponent extends React.Component<IDraggableLineWithButtonComponent> {
        constructor(props: IDraggableLineWithButtonComponent);
        render(): JSX.Element;
    }


    interface IFileButtonLineComponentProps {
        label: string;
        onClick: (file: File) => void;
        accept: string;
        uploadName?: string;
    }
    export class FileButtonLineComponent extends React.Component<IFileButtonLineComponentProps> {
        private _uploadRef;
        constructor(props: IFileButtonLineComponentProps);
        onChange(evt: any): void;
        render(): JSX.Element;
    }


    interface ILineContainerComponentProps {
        title: string;
        children: any[] | any;
        closed?: boolean;
    }
    export class LineContainerComponent extends React.Component<ILineContainerComponentProps, {
        isExpanded: boolean;
    }> {
        constructor(props: ILineContainerComponentProps);
        switchExpandedState(): void;
        renderHeader(): JSX.Element;
        render(): JSX.Element;
    }


    interface ILineWithFileButtonComponentProps {
        title: string;
        closed?: boolean;
        label: string;
        iconImage: any;
        onIconClick: (file: File) => void;
        accept: string;
        uploadName?: string;
    }
    export class LineWithFileButtonComponent extends React.Component<ILineWithFileButtonComponentProps, {
        isExpanded: boolean;
    }> {
        private _uploadRef;
        constructor(props: ILineWithFileButtonComponentProps);
        onChange(evt: any): void;
        switchExpandedState(): void;
        render(): JSX.Element;
    }


    interface IMessageDialogComponentProps {
        globalState: GlobalState;
    }
    export class MessageDialogComponent extends React.Component<IMessageDialogComponentProps, {
        message: string;
        isError: boolean;
    }> {
        constructor(props: IMessageDialogComponentProps);
        render(): JSX.Element | null;
    }


    export class Popup {
        static CreatePopup(title: string, windowVariableName: string, width?: number, height?: number): HTMLDivElement | null;
        static _CopyStyles(sourceDoc: HTMLDocument, targetDoc: HTMLDocument): void;
    }


    interface ITextureLineComponentProps {
        texture: BABYLON.BaseTexture;
        width: number;
        height: number;
        globalState?: any;
        hideChannelSelect?: boolean;
    }
    export interface ITextureLineComponentState {
        displayRed: boolean;
        displayGreen: boolean;
        displayBlue: boolean;
        displayAlpha: boolean;
        face: number;
    }
    export class TextureLineComponent extends React.Component<ITextureLineComponentProps, ITextureLineComponentState> {
        private _canvasRef;
        constructor(props: ITextureLineComponentProps);
        shouldComponentUpdate(): boolean;
        componentDidMount(): void;
        componentDidUpdate(): void;
        updatePreview(): void;
        static UpdatePreview(previewCanvas: HTMLCanvasElement, texture: BABYLON.BaseTexture, width: number, options: ITextureLineComponentState, onReady?: () => void, globalState?: any): Promise<void>;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface IColorComponentEntryProps {
        value: number;
        label: string;
        max?: number;
        min?: number;
        onChange: (value: number) => void;
        disabled?: boolean;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
    }
    export class ColorComponentEntry extends React.Component<IColorComponentEntryProps> {
        constructor(props: IColorComponentEntryProps);
        updateValue(valueString: string): void;
        lock(): void;
        unlock(): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        /**
     * Interface used to specify creation options for color picker
     */
    export interface IColorPickerProps {
        color: BABYLON.Color3 | BABYLON.Color4;
        linearhint?: boolean;
        debugMode?: boolean;
        onColorChanged?: (color: BABYLON.Color3 | BABYLON.Color4) => void;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
    }
    /**
     * Interface used to specify creation options for color picker
     */
    export interface IColorPickerState {
        color: BABYLON.Color3;
        alpha: number;
    }
    /**
     * Class used to create a color picker
     */
    export class ColorPicker extends React.Component<IColorPickerProps, IColorPickerState> {
        private _saturationRef;
        private _hueRef;
        private _isSaturationPointerDown;
        private _isHuePointerDown;
        constructor(props: IColorPickerProps);
        shouldComponentUpdate(nextProps: IColorPickerProps, nextState: IColorPickerState): boolean;
        onSaturationPointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
        onSaturationPointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
        onSaturationPointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
        private _evaluateSaturation;
        private _evaluateHue;
        componentDidUpdate(): void;
        raiseOnColorChanged(): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface IHexColorProps {
        value: string;
        expectedLength: number;
        onChange: (value: string) => void;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
    }
    export class HexColor extends React.Component<IHexColorProps, {
        hex: string;
    }> {
        constructor(props: IHexColorProps);
        shouldComponentUpdate(nextProps: IHexColorProps, nextState: {
            hex: string;
        }): boolean;
        lock(): void;
        unlock(): void;
        updateHexValue(valueString: string): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        /// <reference types="react" />
    export type ButtonProps = {
        disabled?: boolean;
        active?: boolean;
        onClick?: () => void;
        color: "light" | "dark";
        size: "default" | "small" | "wide";
        title?: string;
    };
    export var Button: React.FC<ButtonProps>;



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export function ClassNames(names: any, styleObject: any): string;



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        /// <reference types="react" />
    export type IconProps = {
        color?: "dark" | "light";
        icon: string;
    };
    export var Icon: React.FC<IconProps>;



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export type LabelProps = {
        text: string;
        children?: React.ReactChild;
        color?: "dark" | "light";
    };
    export var Label: React.FC<LabelProps>;



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        /// <reference types="react" />
    export type ToggleProps = {
        toggled: "on" | "mixed" | "off";
        onToggle?: () => void;
        padded?: boolean;
        color?: "dark" | "light";
    };
    export var Toggle: React.FC<ToggleProps>;



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface IBooleanLineComponentProps {
        label: string;
        value: boolean;
        icon?: string;
        iconLabel?: string;
    }
    export class BooleanLineComponent extends React.Component<IBooleanLineComponentProps> {
        constructor(props: IBooleanLineComponentProps);
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface IButtonLineComponentProps {
        label: string;
        onClick: () => void;
        icon?: string;
        iconLabel?: string;
        isDisabled?: boolean;
    }
    export class ButtonLineComponent extends React.Component<IButtonLineComponentProps> {
        constructor(props: IButtonLineComponentProps);
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface ICheckBoxLineComponentProps {
        label?: string;
        target?: any;
        propertyName?: string;
        isSelected?: () => boolean;
        onSelect?: (value: boolean) => void;
        onValueChanged?: () => void;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
        disabled?: boolean;
        icon?: string;
        iconLabel?: string;
        faIcons?: {
            enabled: any;
            disabled: any;
        };
        large?: boolean;
    }
    export class CheckBoxLineComponent extends React.Component<ICheckBoxLineComponentProps, {
        isSelected: boolean;
        isDisabled?: boolean;
        isConflict: boolean;
    }> {
        private _localChange;
        constructor(props: ICheckBoxLineComponentProps);
        shouldComponentUpdate(nextProps: ICheckBoxLineComponentProps, nextState: {
            isSelected: boolean;
            isDisabled: boolean;
            isConflict: boolean;
        }): boolean;
        onChange(): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface IColor3LineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
        isLinear?: boolean;
        icon?: string;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        iconLabel?: string;
        onChange?: () => void;
    }
    export class Color3LineComponent extends React.Component<IColor3LineComponentProps> {
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface IColor4LineComponentProps {
        label: string;
        target?: any;
        propertyName: string;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
        onChange?: () => void;
        isLinear?: boolean;
        icon?: string;
        iconLabel?: string;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
    }
    export class Color4LineComponent extends React.Component<IColor4LineComponentProps> {
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface IColorLineComponentProps {
        label: string;
        target?: any;
        propertyName: string;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
        onChange?: () => void;
        isLinear?: boolean;
        icon?: string;
        iconLabel?: string;
        disableAlpha?: boolean;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
    }
    interface IColorLineComponentState {
        isExpanded: boolean;
        color: BABYLON.Color4;
    }
    export class ColorLineComponent extends React.Component<IColorLineComponentProps, IColorLineComponentState> {
        constructor(props: IColorLineComponentProps);
        shouldComponentUpdate(nextProps: IColorLineComponentProps, nextState: IColorLineComponentState): boolean;
        getValue(props?: Readonly<IColorLineComponentProps> & Readonly<{
            children?: React.ReactNode;
        }>): BABYLON.Color4;
        setColorFromString(colorString: string): void;
        setColor(newColor: BABYLON.Color4): void;
        switchExpandState(): void;
        updateStateR(value: number): void;
        updateStateG(value: number): void;
        updateStateB(value: number): void;
        updateStateA(value: number): void;
        copyToClipboard(): void;
        private _convertToColor;
        private _toColor3;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface IColorPickerComponentProps {
        value: BABYLON.Color4 | BABYLON.Color3;
        linearHint?: boolean;
        onColorChanged: (newOne: string) => void;
        icon?: string;
        iconLabel?: string;
        shouldPopRight?: boolean;
        lockObject?: BABYLON.NodeEditor.SharedUIComponents.LockObject;
    }
    interface IColorPickerComponentState {
        pickerEnabled: boolean;
        color: BABYLON.Color3 | BABYLON.Color4;
        hex: string;
    }
    export class ColorPickerLineComponent extends React.Component<IColorPickerComponentProps, IColorPickerComponentState> {
        private _floatRef;
        private _floatHostRef;
        constructor(props: IColorPickerComponentProps);
        syncPositions(): void;
        shouldComponentUpdate(nextProps: IColorPickerComponentProps, nextState: IColorPickerComponentState): boolean;
        getHexString(props?: Readonly<IColorPickerComponentProps> & Readonly<{
            children?: React.ReactNode;
        }>): string;
        componentDidUpdate(): void;
        componentDidMount(): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface IButtonLineComponentProps {
        data: string;
        tooltip: string;
    }
    export class DraggableLineComponent extends React.Component<IButtonLineComponentProps> {
        constructor(props: IButtonLineComponentProps);
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IFileButtonLineComponentProps {
        label: string;
        onClick: (file: File) => void;
        accept: string;
        icon?: string;
        iconLabel?: string;
    }
    export class FileButtonLineComponent extends React.Component<IFileButtonLineComponentProps> {
        private static _IDGenerator;
        private _id;
        private _uploadInputRef;
        constructor(props: IFileButtonLineComponentProps);
        onChange(evt: any): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IFileMultipleButtonLineComponentProps {
        label: string;
        onClick: (event: any) => void;
        accept: string;
        icon?: string;
        iconLabel?: string;
    }
    export class FileMultipleButtonLineComponent extends React.Component<IFileMultipleButtonLineComponentProps> {
        private static _IDGenerator;
        private _id;
        private _uploadInputRef;
        constructor(props: IFileMultipleButtonLineComponentProps);
        onChange(evt: any): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IFloatLineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        onChange?: (newValue: number) => void;
        isInteger?: boolean;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
        additionalClass?: string;
        step?: string;
        digits?: number;
        useEuler?: boolean;
        min?: number;
        max?: number;
        smallUI?: boolean;
        onEnter?: (newValue: number) => void;
        icon?: string;
        iconLabel?: string;
        defaultValue?: number;
        arrows?: boolean;
        unit?: React.ReactNode;
        onDragStart?: (newValue: number) => void;
        onDragStop?: (newValue: number) => void;
    }
    export class FloatLineComponent extends React.Component<IFloatLineComponentProps, {
        value: string;
        dragging: boolean;
    }> {
        private _localChange;
        private _store;
        constructor(props: IFloatLineComponentProps);
        componentWillUnmount(): void;
        getValueString(value: any): string;
        shouldComponentUpdate(nextProps: IFloatLineComponentProps, nextState: {
            value: string;
            dragging: boolean;
        }): boolean;
        raiseOnPropertyChanged(newValue: number, previousValue: number): void;
        updateValue(valueString: string): void;
        lock(): void;
        unlock(): void;
        incrementValue(amount: number): void;
        onKeyDown(event: React.KeyboardEvent): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IHexLineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        lockObject?: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        onChange?: (newValue: number) => void;
        isInteger?: boolean;
        replaySourceReplacement?: string;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
        additionalClass?: string;
        step?: string;
        digits?: number;
        useEuler?: boolean;
        min?: number;
        icon?: string;
        iconLabel?: string;
    }
    export class HexLineComponent extends React.Component<IHexLineComponentProps, {
        value: string;
    }> {
        private _localChange;
        private _store;
        private _propertyChange;
        constructor(props: IHexLineComponentProps);
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: IHexLineComponentProps, nextState: {
            value: string;
        }): boolean;
        raiseOnPropertyChanged(newValue: number, previousValue: number): void;
        convertToHexString(valueString: string): string;
        updateValue(valueString: string, raisePropertyChanged: boolean): void;
        lock(): void;
        unlock(): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface IIconButtonLineComponentProps {
        icon: string;
        onClick: () => void;
        tooltip: string;
        active?: boolean;
    }
    export class IconButtonLineComponent extends React.Component<IIconButtonLineComponentProps> {
        constructor(props: IIconButtonLineComponentProps);
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IIconComponentProps {
        icon: string;
        label?: string;
    }
    export class IconComponent extends React.Component<IIconComponentProps> {
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IIndentedTextLineComponentProps {
        value?: string;
        color?: string;
        underline?: boolean;
        onLink?: () => void;
        url?: string;
        additionalClass?: string;
    }
    export class IndentedTextLineComponent extends React.Component<IIndentedTextLineComponentProps> {
        constructor(props: IIndentedTextLineComponentProps);
        onLink(): void;
        renderContent(): JSX.Element;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IInputArrowsComponentProps {
        incrementValue: (amount: number) => void;
        setDragging: (dragging: boolean) => void;
    }
    export class InputArrowsComponent extends React.Component<IInputArrowsComponentProps> {
        private _arrowsRef;
        private _drag;
        private _releaseListener;
        private _lockChangeListener;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface ISelectedLineContainer {
        selectedLineContainerTitles: Array<string>;
        selectedLineContainerTitlesNoFocus: Array<string>;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface ILineContainerComponentProps {
        selection?: BABYLON.NodeEditor.SharedUIComponents.ISelectedLineContainer;
        title: string;
        children: any[] | any;
        closed?: boolean;
    }
    export class LineContainerComponent extends React.Component<ILineContainerComponentProps, {
        isExpanded: boolean;
        isHighlighted: boolean;
    }> {
        constructor(props: ILineContainerComponentProps);
        switchExpandedState(): void;
        renderHeader(): JSX.Element;
        componentDidMount(): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface ILinkButtonComponentProps {
        label: string;
        buttonLabel: string;
        url?: string;
        onClick: () => void;
        icon?: any;
        onIconClick?: () => void;
    }
    export class LinkButtonComponent extends React.Component<ILinkButtonComponentProps> {
        constructor(props: ILinkButtonComponentProps);
        onLink(): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IMatrixLineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        step?: number;
        onChange?: (newValue: BABYLON.Matrix) => void;
        onModeChange?: (mode: number) => void;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
        mode?: number;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
    }
    export class MatrixLineComponent extends React.Component<IMatrixLineComponentProps, {
        value: BABYLON.Matrix;
        mode: number;
        angle: number;
    }> {
        private _localChange;
        constructor(props: IMatrixLineComponentProps);
        shouldComponentUpdate(nextProps: IMatrixLineComponentProps, nextState: {
            value: BABYLON.Matrix;
            mode: number;
            angle: number;
        }): boolean;
        raiseOnPropertyChanged(previousValue: BABYLON.Vector3): void;
        updateMatrix(): void;
        updateRow(value: BABYLON.Vector4, row: number): void;
        updateBasedOnMode(value: number): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IMessageLineComponentProps {
        text: string;
        color?: string;
        icon?: any;
    }
    export class MessageLineComponent extends React.Component<IMessageLineComponentProps> {
        constructor(props: IMessageLineComponentProps);
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface INumericInputComponentProps {
        label: string;
        value: number;
        step?: number;
        onChange: (value: number) => void;
        precision?: number;
        icon?: string;
        iconLabel?: string;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
    }
    export class NumericInputComponent extends React.Component<INumericInputComponentProps, {
        value: string;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: INumericInputComponentProps);
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: INumericInputComponentProps, nextState: {
            value: string;
        }): boolean;
        updateValue(evt: any): void;
        onBlur(): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export var Null_Value: number;
    export interface IOptionsLineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        options: BABYLON.IInspectableOptions[];
        noDirectUpdate?: boolean;
        onSelect?: (value: number | string) => void;
        extractValue?: (target: any) => number | string;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
        allowNullValue?: boolean;
        icon?: string;
        iconLabel?: string;
        className?: string;
        valuesAreStrings?: boolean;
        defaultIfNull?: number;
    }
    export class OptionsLineComponent extends React.Component<IOptionsLineComponentProps, {
        value: number | string;
    }> {
        private _localChange;
        private _remapValueIn;
        private _remapValueOut;
        private _getValue;
        constructor(props: IOptionsLineComponentProps);
        shouldComponentUpdate(nextProps: IOptionsLineComponentProps, nextState: {
            value: number;
        }): boolean;
        raiseOnPropertyChanged(newValue: number, previousValue: number): void;
        setValue(value: string | number): void;
        updateValue(valueString: string): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export class Popup {
        static CreatePopup(title: string, windowVariableName: string, width?: number, height?: number): HTMLDivElement | null;
        private static _CopyStyles;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IRadioButtonLineComponentProps {
        onSelectionChangedObservable: BABYLON.Observable<RadioButtonLineComponent>;
        label: string;
        isSelected: () => boolean;
        onSelect: () => void;
        icon?: string;
        iconLabel?: string;
    }
    export class RadioButtonLineComponent extends React.Component<IRadioButtonLineComponentProps, {
        isSelected: boolean;
    }> {
        private _onSelectionChangedObserver;
        constructor(props: IRadioButtonLineComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        onChange(): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface ISliderLineComponentProps {
        label: string;
        target?: any;
        propertyName?: string;
        minimum: number;
        maximum: number;
        step: number;
        directValue?: number;
        useEuler?: boolean;
        onChange?: (value: number) => void;
        onInput?: (value: number) => void;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
        decimalCount?: number;
        margin?: boolean;
        icon?: string;
        iconLabel?: string;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        unit?: React.ReactNode;
    }
    export class SliderLineComponent extends React.Component<ISliderLineComponentProps, {
        value: number;
    }> {
        private _localChange;
        constructor(props: ISliderLineComponentProps);
        shouldComponentUpdate(nextProps: ISliderLineComponentProps, nextState: {
            value: number;
        }): boolean;
        onChange(newValueString: any): void;
        onInput(newValueString: any): void;
        prepareDataToRead(value: number): number;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export const conflictingValuesPlaceholder = "\u2014";
    /**
     *
     * @param targets a list of selected targets
     * @param onPropertyChangedObservable
     * @param getProperty
     * @returns a proxy object that can be passed as a target into the input
     */
    export function makeTargetsProxy<Type>(targets: Type[], onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>, getProperty?: (target: Type, property: keyof Type) => any): any;



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface ITextInputLineComponentProps {
        label?: string;
        lockObject?: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        target?: any;
        propertyName?: string;
        value?: string;
        onChange?: (value: string) => void;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
        icon?: string;
        iconLabel?: string;
        noUnderline?: boolean;
        numbersOnly?: boolean;
        delayInput?: boolean;
        arrows?: boolean;
        arrowsIncrement?: (amount: number) => void;
        step?: number;
        numeric?: boolean;
        roundValues?: boolean;
        min?: number;
        max?: number;
        placeholder?: string;
        unit?: React.ReactNode;
        validator?: (value: string) => boolean;
        multilines?: boolean;
    }
    export class TextInputLineComponent extends React.Component<ITextInputLineComponentProps, {
        value: string;
        dragging: boolean;
    }> {
        private _localChange;
        constructor(props: ITextInputLineComponentProps);
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: ITextInputLineComponentProps, nextState: {
            value: string;
            dragging: boolean;
        }): boolean;
        raiseOnPropertyChanged(newValue: string, previousValue: string): void;
        getCurrentNumericValue(value: string): number;
        updateValue(value: string, valueToValidate?: string): void;
        incrementValue(amount: number): void;
        onKeyDown(event: React.KeyboardEvent): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface ITextLineComponentProps {
        label?: string;
        value?: string;
        color?: string;
        underline?: boolean;
        onLink?: () => void;
        url?: string;
        ignoreValue?: boolean;
        additionalClass?: string;
        icon?: string;
        iconLabel?: string;
        tooltip?: string;
    }
    export class TextLineComponent extends React.Component<ITextLineComponentProps> {
        constructor(props: ITextLineComponentProps);
        onLink(): void;
        renderContent(): JSX.Element | null;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        /// <reference types="react" />
    interface IUnitButtonProps {
        unit: string;
        locked?: boolean;
        onClick?: (unit: string) => void;
    }
    export function UnitButton(props: IUnitButtonProps): JSX.Element;



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IValueLineComponentProps {
        label: string;
        value: number;
        color?: string;
        fractionDigits?: number;
        units?: string;
        icon?: string;
        iconLabel?: string;
    }
    export class ValueLineComponent extends React.Component<IValueLineComponentProps> {
        constructor(props: IValueLineComponentProps);
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IVector2LineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        step?: number;
        onChange?: (newvalue: BABYLON.Vector2) => void;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
        icon?: string;
        iconLabel?: string;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
    }
    export class Vector2LineComponent extends React.Component<IVector2LineComponentProps, {
        isExpanded: boolean;
        value: BABYLON.Vector2;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: IVector2LineComponentProps);
        shouldComponentUpdate(nextProps: IVector2LineComponentProps, nextState: {
            isExpanded: boolean;
            value: BABYLON.Vector2;
        }): boolean;
        switchExpandState(): void;
        raiseOnPropertyChanged(previousValue: BABYLON.Vector2): void;
        updateStateX(value: number): void;
        updateStateY(value: number): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IVector3LineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        step?: number;
        onChange?: (newvalue: BABYLON.Vector3) => void;
        useEuler?: boolean;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
        noSlider?: boolean;
        icon?: string;
        iconLabel?: string;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
    }
    export class Vector3LineComponent extends React.Component<IVector3LineComponentProps, {
        isExpanded: boolean;
        value: BABYLON.Vector3;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: IVector3LineComponentProps);
        getCurrentValue(): any;
        shouldComponentUpdate(nextProps: IVector3LineComponentProps, nextState: {
            isExpanded: boolean;
            value: BABYLON.Vector3;
        }): boolean;
        switchExpandState(): void;
        raiseOnPropertyChanged(previousValue: BABYLON.Vector3): void;
        updateVector3(): void;
        updateStateX(value: number): void;
        updateStateY(value: number): void;
        updateStateZ(value: number): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IVector4LineComponentProps {
        label: string;
        target?: any;
        propertyName?: string;
        step?: number;
        onChange?: (newvalue: BABYLON.Vector4) => void;
        useEuler?: boolean;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
        icon?: string;
        iconLabel?: string;
        value?: BABYLON.Vector4;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
    }
    export class Vector4LineComponent extends React.Component<IVector4LineComponentProps, {
        isExpanded: boolean;
        value: BABYLON.Vector4;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: IVector4LineComponentProps);
        getCurrentValue(): any;
        shouldComponentUpdate(nextProps: IVector4LineComponentProps, nextState: {
            isExpanded: boolean;
            value: BABYLON.Vector4;
        }): boolean;
        switchExpandState(): void;
        raiseOnPropertyChanged(previousValue: BABYLON.Vector4): void;
        updateVector4(): void;
        updateStateX(value: number): void;
        updateStateY(value: number): void;
        updateStateZ(value: number): void;
        updateStateW(value: number): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export class DisplayLedger {
        static RegisteredControls: {
            [key: string]: any;
        };
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export class FrameNodePort extends BABYLON.NodeEditor.SharedUIComponents.NodePort {
        portData: BABYLON.NodeEditor.SharedUIComponents.IPortData;
        node: BABYLON.NodeEditor.SharedUIComponents.GraphNode;
        private _parentFrameId;
        private _isInput;
        private _framePortPosition;
        private _framePortId;
        private _onFramePortPositionChangedObservable;
        get parentFrameId(): number;
        get onFramePortPositionChangedObservable(): BABYLON.Observable<FrameNodePort>;
        get isInput(): boolean;
        get framePortId(): number;
        get framePortPosition(): BABYLON.NodeEditor.SharedUIComponents.FramePortPosition;
        set framePortPosition(position: BABYLON.NodeEditor.SharedUIComponents.FramePortPosition);
        constructor(portContainer: HTMLElement, portData: BABYLON.NodeEditor.SharedUIComponents.IPortData, node: BABYLON.NodeEditor.SharedUIComponents.GraphNode, stateManager: BABYLON.NodeEditor.SharedUIComponents.StateManager, isInput: boolean, framePortId: number, parentFrameId: number);
        static CreateFrameNodePortElement(portData: BABYLON.NodeEditor.SharedUIComponents.IPortData, node: BABYLON.NodeEditor.SharedUIComponents.GraphNode, root: HTMLElement, displayManager: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.IDisplayManager>, stateManager: BABYLON.NodeEditor.SharedUIComponents.StateManager, isInput: boolean, framePortId: number, parentFrameId: number): FrameNodePort;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface IGraphCanvasComponentProps {
        stateManager: BABYLON.NodeEditor.SharedUIComponents.StateManager;
        onEmitNewNode: (nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData) => BABYLON.NodeEditor.SharedUIComponents.GraphNode;
    }
    export class GraphCanvasComponent extends React.Component<IGraphCanvasComponentProps> implements BABYLON.NodeEditor.SharedUIComponents.INodeContainer {
        static readonly NodeWidth = 100;
        private readonly _minZoom;
        private readonly _maxZoom;
        private _hostCanvas;
        private _graphCanvas;
        private _selectionContainer;
        private _frameContainer;
        private _svgCanvas;
        private _rootContainer;
        private _nodes;
        private _links;
        private _mouseStartPointX;
        private _mouseStartPointY;
        private _dropPointX;
        private _dropPointY;
        private _selectionStartX;
        private _selectionStartY;
        private _candidateLinkedHasMoved;
        private _x;
        private _y;
        private _zoom;
        private _selectedNodes;
        private _selectedLink;
        private _selectedPort;
        private _candidateLink;
        private _candidatePort;
        private _gridSize;
        private _selectionBox;
        private _selectedFrames;
        private _frameCandidate;
        private _frames;
        private _nodeDataContentList;
        private _altKeyIsPressed;
        private _multiKeyIsPressed;
        private _oldY;
        _frameIsMoving: boolean;
        _isLoading: boolean;
        private _copiedNodes;
        private _copiedFrames;
        get gridSize(): number;
        set gridSize(value: number);
        get stateManager(): BABYLON.NodeEditor.SharedUIComponents.StateManager;
        get nodes(): BABYLON.NodeEditor.SharedUIComponents.GraphNode[];
        get links(): BABYLON.NodeEditor.SharedUIComponents.NodeLink[];
        get frames(): BABYLON.NodeEditor.SharedUIComponents.GraphFrame[];
        get zoom(): number;
        set zoom(value: number);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get selectedNodes(): BABYLON.NodeEditor.SharedUIComponents.GraphNode[];
        get selectedLink(): BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.NodeLink>;
        get selectedFrames(): BABYLON.NodeEditor.SharedUIComponents.GraphFrame[];
        get selectedPort(): BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.NodePort>;
        get canvasContainer(): HTMLDivElement;
        get hostCanvas(): HTMLDivElement;
        get svgCanvas(): HTMLElement;
        get selectionContainer(): HTMLDivElement;
        get frameContainer(): HTMLDivElement;
        private _selectedFrameAndNodesConflict;
        constructor(props: IGraphCanvasComponentProps);
        populateConnectedEntriesBeforeRemoval(item: BABYLON.NodeEditor.SharedUIComponents.GraphNode, items: BABYLON.NodeEditor.SharedUIComponents.GraphNode[], inputs: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.IPortData>[], outputs: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.IPortData>[]): void;
        automaticRewire(inputs: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.IPortData>[], outputs: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.IPortData>[]): void;
        handleKeyDown(evt: KeyboardEvent, onRemove: (nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData) => void, mouseLocationX: number, mouseLocationY: number, dataGenerator: (nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData) => any, rootElement: HTMLDivElement): void;
        pasteSelection(copiedNodes: BABYLON.NodeEditor.SharedUIComponents.GraphNode[], currentX: number, currentY: number, dataGenerator: (nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData) => any, selectNew?: boolean): BABYLON.NodeEditor.SharedUIComponents.GraphNode[];
        reconnectNewNodes(nodeIndex: number, newNodes: BABYLON.NodeEditor.SharedUIComponents.GraphNode[], sourceNodes: BABYLON.NodeEditor.SharedUIComponents.GraphNode[], done: boolean[]): void;
        getCachedData(): any[];
        removeDataFromCache(data: any): void;
        createNodeFromObject(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData, onNodeCreated: (data: any) => void, recursion?: boolean): BABYLON.NodeEditor.SharedUIComponents.GraphNode;
        getGridPosition(position: number, useCeil?: boolean): number;
        getGridPositionCeil(position: number): number;
        updateTransform(): void;
        onKeyUp(): void;
        findNodeFromData(data: any): BABYLON.NodeEditor.SharedUIComponents.GraphNode;
        reset(): void;
        connectPorts(pointA: BABYLON.NodeEditor.SharedUIComponents.IPortData, pointB: BABYLON.NodeEditor.SharedUIComponents.IPortData): void;
        removeLink(link: BABYLON.NodeEditor.SharedUIComponents.NodeLink): void;
        appendNode(nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData): BABYLON.NodeEditor.SharedUIComponents.GraphNode;
        distributeGraph(): void;
        componentDidMount(): void;
        onMove(evt: React.PointerEvent): void;
        onDown(evt: React.PointerEvent<HTMLElement>): void;
        onUp(evt: React.PointerEvent): void;
        onWheel(evt: React.WheelEvent): void;
        zoomToFit(): void;
        processCandidatePort(): void;
        connectNodes(nodeA: BABYLON.NodeEditor.SharedUIComponents.GraphNode, pointA: BABYLON.NodeEditor.SharedUIComponents.IPortData, nodeB: BABYLON.NodeEditor.SharedUIComponents.GraphNode, pointB: BABYLON.NodeEditor.SharedUIComponents.IPortData): void;
        drop(newNode: BABYLON.NodeEditor.SharedUIComponents.GraphNode, targetX: number, targetY: number, offsetX: number, offsetY: number): void;
        processEditorData(editorData: BABYLON.NodeEditor.SharedUIComponents.IEditorData): void;
        reOrganize(editorData?: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.IEditorData>, isImportingAFrame?: boolean): void;
        addFrame(frameData: BABYLON.NodeEditor.SharedUIComponents.IFrameData): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export enum FramePortPosition {
        Top = 0,
        Middle = 1,
        Bottom = 2
    }
    export class GraphFrame {
        private readonly _collapsedWidth;
        private static _FrameCounter;
        private static _FramePortCounter;
        private _name;
        private _color;
        private _x;
        private _y;
        private _gridAlignedX;
        private _gridAlignedY;
        private _width;
        private _height;
        element: HTMLDivElement;
        private _borderElement;
        private _headerElement;
        private _headerTextElement;
        private _headerCollapseElement;
        private _headerCloseElement;
        private _commentsElement;
        private _portContainer;
        private _outputPortContainer;
        private _inputPortContainer;
        private _nodes;
        private _ownerCanvas;
        private _mouseStartPointX;
        private _mouseStartPointY;
        private _onSelectionChangedObserver;
        private _onGraphNodeRemovalObserver;
        private _onExposePortOnFrameObserver;
        private _onNodeLinkDisposedObservers;
        private _isCollapsed;
        private _frameInPorts;
        private _frameOutPorts;
        private _controlledPorts;
        private _exposedInPorts;
        private _exposedOutPorts;
        private _id;
        private _comments;
        private _frameIsResizing;
        private _resizingDirection;
        private _minFrameHeight;
        private _minFrameWidth;
        private _mouseXLimit;
        onExpandStateChanged: BABYLON.Observable<GraphFrame>;
        private readonly _closeSVG;
        private readonly _expandSVG;
        private readonly _collapseSVG;
        get id(): number;
        get isCollapsed(): boolean;
        private _createInputPort;
        private _markFramePortPositions;
        private _createFramePorts;
        private _removePortFromExposedWithNode;
        private _removePortFromExposedWithLink;
        private _createInputPorts;
        private _createOutputPorts;
        redrawFramePorts(): void;
        set isCollapsed(value: boolean);
        get nodes(): BABYLON.NodeEditor.SharedUIComponents.GraphNode[];
        get ports(): BABYLON.NodeEditor.SharedUIComponents.FrameNodePort[];
        get name(): string;
        set name(value: string);
        get color(): BABYLON.Color3;
        set color(value: BABYLON.Color3);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get width(): number;
        set width(value: number);
        get height(): number;
        set height(value: number);
        get comments(): string;
        set comments(comments: string);
        constructor(candidate: BABYLON.Nullable<HTMLDivElement>, canvas: BABYLON.NodeEditor.SharedUIComponents.GraphCanvasComponent, doNotCaptureNodes?: boolean);
        refresh(): void;
        addNode(node: BABYLON.NodeEditor.SharedUIComponents.GraphNode): void;
        removeNode(node: BABYLON.NodeEditor.SharedUIComponents.GraphNode): void;
        syncNode(node: BABYLON.NodeEditor.SharedUIComponents.GraphNode): void;
        cleanAccumulation(): void;
        private _onDown;
        move(newX: number, newY: number, align?: boolean): void;
        private _onUp;
        _moveFrame(offsetX: number, offsetY: number): void;
        private _onMove;
        moveFramePortUp(nodePort: BABYLON.NodeEditor.SharedUIComponents.FrameNodePort): void;
        private _movePortUp;
        moveFramePortDown(nodePort: BABYLON.NodeEditor.SharedUIComponents.FrameNodePort): void;
        private _movePortDown;
        private _initResizing;
        private _cleanUpResizing;
        private _updateMinHeightWithComments;
        private _isResizingTop;
        private _isResizingRight;
        private _isResizingBottom;
        private _isResizingLeft;
        private _onRightHandlePointerDown;
        private _onRightHandlePointerMove;
        private _moveRightHandle;
        private _onRightHandlePointerUp;
        private _onBottomHandlePointerDown;
        private _onBottomHandlePointerMove;
        private _moveBottomHandle;
        private _onBottomHandlePointerUp;
        private _onLeftHandlePointerDown;
        private _onLeftHandlePointerMove;
        private _moveLeftHandle;
        private _onLeftHandlePointerUp;
        private _onTopHandlePointerDown;
        private _onTopHandlePointerMove;
        private _moveTopHandle;
        private _onTopHandlePointerUp;
        private _onTopRightHandlePointerDown;
        private _onTopRightHandlePointerMove;
        private _moveTopRightHandle;
        private _onTopRightHandlePointerUp;
        private _onBottomRightHandlePointerDown;
        private _onBottomRightHandlePointerMove;
        private _moveBottomRightHandle;
        private _onBottomRightHandlePointerUp;
        private _onBottomLeftHandlePointerDown;
        private _onBottomLeftHandlePointerMove;
        private _moveBottomLeftHandle;
        private _onBottomLeftHandlePointerUp;
        private _onTopLeftHandlePointerDown;
        private _onTopLeftHandlePointerMove;
        private _moveTopLeftHandle;
        private _onTopLeftHandlePointerUp;
        private _expandLeft;
        private _expandTop;
        private _expandRight;
        private _expandBottom;
        dispose(): void;
        private _serializePortData;
        serialize(saveCollapsedState: boolean): BABYLON.NodeEditor.SharedUIComponents.IFrameData;
        export(): void;
        adjustPorts(): void;
        static Parse(serializationData: BABYLON.NodeEditor.SharedUIComponents.IFrameData, canvas: BABYLON.NodeEditor.SharedUIComponents.GraphCanvasComponent, map?: {
            [key: number]: number;
        }): GraphFrame;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        /// <reference types="react" />
    export class GraphNode {
        content: BABYLON.NodeEditor.SharedUIComponents.INodeData;
        private _visual;
        private _headerContainer;
        private _headerIcon;
        private _headerIconImg;
        private _header;
        private _connections;
        private _inputsContainer;
        private _outputsContainer;
        private _content;
        private _comments;
        private _inputPorts;
        private _outputPorts;
        private _links;
        private _x;
        private _y;
        private _gridAlignedX;
        private _gridAlignedY;
        private _mouseStartPointX;
        private _mouseStartPointY;
        private _stateManager;
        private _onSelectionChangedObserver;
        private _onSelectionBoxMovedObserver;
        private _onFrameCreatedObserver;
        private _onUpdateRequiredObserver;
        private _ownerCanvas;
        private _isSelected;
        private _displayManager;
        private _isVisible;
        private _enclosingFrameId;
        get isVisible(): boolean;
        set isVisible(value: boolean);
        private _upateNodePortNames;
        get outputPorts(): BABYLON.NodeEditor.SharedUIComponents.NodePort[];
        get inputPorts(): BABYLON.NodeEditor.SharedUIComponents.NodePort[];
        get links(): BABYLON.NodeEditor.SharedUIComponents.NodeLink[];
        get gridAlignedX(): number;
        get gridAlignedY(): number;
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get width(): number;
        get height(): number;
        get id(): number;
        get name(): string;
        get isSelected(): boolean;
        get enclosingFrameId(): number;
        set enclosingFrameId(value: number);
        set isSelected(value: boolean);
        setIsSelected(value: boolean, marqueeSelection: boolean): void;
        constructor(content: BABYLON.NodeEditor.SharedUIComponents.INodeData, stateManager: BABYLON.NodeEditor.SharedUIComponents.StateManager);
        isOverlappingFrame(frame: BABYLON.NodeEditor.SharedUIComponents.GraphFrame): boolean;
        getPortForPortData(portData: BABYLON.NodeEditor.SharedUIComponents.IPortData): BABYLON.NodeEditor.SharedUIComponents.NodePort | null;
        getPortDataForPortDataContent(data: any): BABYLON.NodeEditor.SharedUIComponents.IPortData | null;
        getLinksForPortDataContent(data: any): BABYLON.NodeEditor.SharedUIComponents.NodeLink[];
        getLinksForPortData(portData: BABYLON.NodeEditor.SharedUIComponents.IPortData): BABYLON.NodeEditor.SharedUIComponents.NodeLink[];
        private _refreshFrames;
        _refreshLinks(): void;
        refresh(): void;
        private _onDown;
        cleanAccumulation(useCeil?: boolean): void;
        private _onUp;
        private _onMove;
        renderProperties(): BABYLON.Nullable<JSX.Element>;
        appendVisual(root: HTMLDivElement, owner: BABYLON.NodeEditor.SharedUIComponents.GraphCanvasComponent): void;
        dispose(): void;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface IDisplayManager {
        getHeaderClass(data: BABYLON.NodeEditor.SharedUIComponents.INodeData): string;
        shouldDisplayPortLabels(data: BABYLON.NodeEditor.SharedUIComponents.IPortData): boolean;
        updatePreviewContent(data: BABYLON.NodeEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
        getBackgroundColor(data: BABYLON.NodeEditor.SharedUIComponents.INodeData): string;
        getHeaderText(data: BABYLON.NodeEditor.SharedUIComponents.INodeData): string;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface INodeContainer {
        nodes: BABYLON.NodeEditor.SharedUIComponents.GraphNode[];
        appendNode(data: BABYLON.NodeEditor.SharedUIComponents.INodeData): BABYLON.NodeEditor.SharedUIComponents.GraphNode;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface INodeData {
        data: any;
        name: string;
        uniqueId: number;
        isInput: boolean;
        comments: string;
        prepareHeaderIcon: (iconDiv: HTMLDivElement, img: HTMLImageElement) => void;
        getClassName: () => string;
        dispose: () => void;
        getPortByName: (name: string) => BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.IPortData>;
        inputs: BABYLON.NodeEditor.SharedUIComponents.IPortData[];
        outputs: BABYLON.NodeEditor.SharedUIComponents.IPortData[];
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface INodeLocationInfo {
        blockId: number;
        x: number;
        y: number;
    }
    export interface IFrameData {
        x: number;
        y: number;
        width: number;
        height: number;
        color: number[];
        name: string;
        isCollapsed: boolean;
        blocks: number[];
        comments: string;
    }
    export interface IEditorData {
        locations: INodeLocationInfo[];
        x: number;
        y: number;
        zoom: number;
        frames?: IFrameData[];
        map?: {
            [key: number]: number;
        };
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export enum PortDataDirection {
        /** Input */
        Input = 0,
        /** Output */
        Output = 1
    }
    export interface IPortData {
        data: any;
        name: string;
        internalName: string;
        isExposedOnFrame: boolean;
        exposedPortPosition: number;
        isConnected: boolean;
        direction: PortDataDirection;
        ownerData: any;
        connectedPort: BABYLON.Nullable<IPortData>;
        needDualDirectionValidation: boolean;
        hasEndpoints: boolean;
        endpoints: BABYLON.Nullable<IPortData[]>;
        updateDisplayName: (newName: string) => void;
        canConnectTo: (port: IPortData) => boolean;
        connectTo: (port: IPortData) => void;
        disconnectFrom: (port: IPortData) => void;
        checkCompatibilityState(port: IPortData): number;
        getCompatibilityIssueMessage(issue: number, targetNode: BABYLON.NodeEditor.SharedUIComponents.GraphNode, targetPort: IPortData): string;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface IPropertyComponentProps {
        stateManager: BABYLON.NodeEditor.SharedUIComponents.StateManager;
        nodeData: BABYLON.NodeEditor.SharedUIComponents.INodeData;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export interface ISelectionChangedOptions {
        selection: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.GraphNode | BABYLON.NodeEditor.SharedUIComponents.NodeLink | BABYLON.NodeEditor.SharedUIComponents.GraphFrame | BABYLON.NodeEditor.SharedUIComponents.NodePort | BABYLON.NodeEditor.SharedUIComponents.FramePortData>;
        forceKeepSelection?: boolean;
        marqueeSelection?: boolean;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export class NodeLink {
        private _graphCanvas;
        private _portA;
        private _portB?;
        private _nodeA;
        private _nodeB?;
        private _path;
        private _selectionPath;
        private _onSelectionChangedObserver;
        private _isVisible;
        onDisposedObservable: BABYLON.Observable<NodeLink>;
        get isVisible(): boolean;
        set isVisible(value: boolean);
        get portA(): BABYLON.NodeEditor.SharedUIComponents.FrameNodePort | BABYLON.NodeEditor.SharedUIComponents.NodePort;
        get portB(): BABYLON.NodeEditor.SharedUIComponents.FrameNodePort | BABYLON.NodeEditor.SharedUIComponents.NodePort | undefined;
        get nodeA(): BABYLON.NodeEditor.SharedUIComponents.GraphNode;
        get nodeB(): BABYLON.NodeEditor.SharedUIComponents.GraphNode | undefined;
        update(endX?: number, endY?: number, straight?: boolean): void;
        constructor(graphCanvas: BABYLON.NodeEditor.SharedUIComponents.GraphCanvasComponent, portA: BABYLON.NodeEditor.SharedUIComponents.NodePort, nodeA: BABYLON.NodeEditor.SharedUIComponents.GraphNode, portB?: BABYLON.NodeEditor.SharedUIComponents.NodePort, nodeB?: BABYLON.NodeEditor.SharedUIComponents.GraphNode);
        onClick(evt: MouseEvent): void;
        dispose(notify?: boolean): void;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export class NodePort {
        portData: BABYLON.NodeEditor.SharedUIComponents.IPortData;
        node: BABYLON.NodeEditor.SharedUIComponents.GraphNode;
        protected _element: HTMLDivElement;
        protected _img: HTMLImageElement;
        protected _stateManager: BABYLON.NodeEditor.SharedUIComponents.StateManager;
        protected _portLabelElement: Element;
        protected _onCandidateLinkMovedObserver: BABYLON.Nullable<BABYLON.Observer<BABYLON.Nullable<BABYLON.Vector2>>>;
        protected _onSelectionChangedObserver: BABYLON.Nullable<BABYLON.Observer<BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.ISelectionChangedOptions>>>;
        protected _exposedOnFrame: boolean;
        delegatedPort: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.FrameNodePort>;
        get element(): HTMLDivElement;
        get portName(): string;
        set portName(newName: string);
        get disabled(): boolean;
        hasLabel(): boolean;
        get exposedOnFrame(): boolean;
        set exposedOnFrame(value: boolean);
        get exposedPortPosition(): number;
        set exposedPortPosition(value: number);
        private _isConnectedToNodeOutsideOfFrame;
        refresh(): void;
        constructor(portContainer: HTMLElement, portData: BABYLON.NodeEditor.SharedUIComponents.IPortData, node: BABYLON.NodeEditor.SharedUIComponents.GraphNode, stateManager: BABYLON.NodeEditor.SharedUIComponents.StateManager);
        dispose(): void;
        static CreatePortElement(portData: BABYLON.NodeEditor.SharedUIComponents.IPortData, node: BABYLON.NodeEditor.SharedUIComponents.GraphNode, root: HTMLElement, displayManager: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.IDisplayManager>, stateManager: BABYLON.NodeEditor.SharedUIComponents.StateManager): NodePort;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export class PropertyLedger {
        static DefaultControl: React.ComponentClass<BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps>;
        static RegisteredControls: {
            [key: string]: React.ComponentClass<BABYLON.NodeEditor.SharedUIComponents.IPropertyComponentProps>;
        };
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export class StateManager {
        data: any;
        hostDocument: Document;
        lockObject: any;
        onSelectionChangedObservable: BABYLON.Observable<BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.ISelectionChangedOptions>>;
        onFrameCreatedObservable: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.GraphFrame>;
        onUpdateRequiredObservable: BABYLON.Observable<any>;
        onGraphNodeRemovalObservable: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.GraphNode>;
        onSelectionBoxMoved: BABYLON.Observable<ClientRect | DOMRect>;
        onCandidateLinkMoved: BABYLON.Observable<BABYLON.Nullable<BABYLON.Vector2>>;
        onCandidatePortSelectedObservable: BABYLON.Observable<BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.FrameNodePort | BABYLON.NodeEditor.SharedUIComponents.NodePort>>;
        onNewNodeCreatedObservable: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.GraphNode>;
        onRebuildRequiredObservable: BABYLON.Observable<boolean>;
        onErrorMessageDialogRequiredObservable: BABYLON.Observable<string>;
        onExposePortOnFrameObservable: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.GraphNode>;
        onGridSizeChanged: BABYLON.Observable<void>;
        onNewBlockRequiredObservable: BABYLON.Observable<{
            type: string;
            targetX: number;
            targetY: number;
            needRepositioning?: boolean | undefined;
        }>;
        exportData: (data: any, frame?: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.GraphFrame>) => string;
        isElbowConnectionAllowed: (nodeA: BABYLON.NodeEditor.SharedUIComponents.FrameNodePort | BABYLON.NodeEditor.SharedUIComponents.NodePort, nodeB: BABYLON.NodeEditor.SharedUIComponents.FrameNodePort | BABYLON.NodeEditor.SharedUIComponents.NodePort) => boolean;
        applyNodePortDesign: (data: BABYLON.NodeEditor.SharedUIComponents.IPortData, element: HTMLElement, img: HTMLImageElement) => void;
        storeEditorData: (serializationObject: any, frame?: BABYLON.Nullable<BABYLON.NodeEditor.SharedUIComponents.GraphFrame>) => void;
        getEditorDataMap: () => {
            [key: number]: number;
        };
        createDefaultInputData: (rootData: any, portData: BABYLON.NodeEditor.SharedUIComponents.IPortData, nodeContainer: BABYLON.NodeEditor.SharedUIComponents.INodeContainer) => {
            data: BABYLON.NodeEditor.SharedUIComponents.INodeData;
            name: string;
        };
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export const IsFramePortData: (variableToCheck: any) => variableToCheck is BABYLON.NodeEditor.SharedUIComponents.FramePortData;
    export const RefreshNode: (node: BABYLON.NodeEditor.SharedUIComponents.GraphNode, visitedNodes?: Set<BABYLON.NodeEditor.SharedUIComponents.GraphNode> | undefined, visitedLinks?: Set<BABYLON.NodeEditor.SharedUIComponents.NodeLink> | undefined) => void;



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export class TypeLedger {
        static PortDataBuilder: (port: BABYLON.NodeEditor.SharedUIComponents.NodePort, nodeContainer: BABYLON.NodeEditor.SharedUIComponents.INodeContainer) => BABYLON.NodeEditor.SharedUIComponents.IPortData;
        static NodeDataBuilder: (data: any, nodeContainer: BABYLON.NodeEditor.SharedUIComponents.INodeContainer) => BABYLON.NodeEditor.SharedUIComponents.INodeData;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export type FramePortData = {
        frame: BABYLON.NodeEditor.SharedUIComponents.GraphFrame;
        port: FrameNodePort;
    };



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export class PropertyChangedEvent {
        object: any;
        property: string;
        value: any;
        initialValue: any;
        allowNullValue?: boolean;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        /// <reference types="react" />
    var _default: {
        title: string;
        component: import("react").FC<BABYLON.NodeEditor.SharedUIComponents.ButtonProps>;
    };
    export var Default: any;
    export var Wide: any;
    export var Small: any;



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        /// <reference types="react" />
    var _default: {
        title: string;
        component: import("react").FC<BABYLON.NodeEditor.SharedUIComponents.IconProps>;
    };
    export var Light: any;
    export var Dark: any;



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        /// <reference types="react" />
    var _default: {
        title: string;
        component: import("react").FC<BABYLON.NodeEditor.SharedUIComponents.LabelProps>;
    };
    export var Default: any;



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        /// <reference types="react" />
    var _default: {
        title: string;
        component: import("react").FC<BABYLON.NodeEditor.SharedUIComponents.ToggleProps>;
    };
    export var Default: any;
    export var Padded: any;



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        export class StringTools {
        private static _SaveAs;
        private static _Click;
        /**
         * Download a string into a file that will be saved locally by the browser
         * @param document
         * @param content defines the string to download locally as a file
         * @param filename
         */
        static DownloadAsFile(document: HTMLDocument, content: string, filename: string): void;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface ICheckboxPropertyGridComponentProps {
        checkbox: BABYLON.GUI.Checkbox;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class CheckboxPropertyGridComponent extends React.Component<ICheckboxPropertyGridComponentProps> {
        constructor(props: ICheckboxPropertyGridComponentProps);
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IColorPickerPropertyGridComponentProps {
        colorPicker: BABYLON.GUI.ColorPicker;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ColorPickerPropertyGridComponent extends React.Component<IColorPickerPropertyGridComponentProps> {
        constructor(props: IColorPickerPropertyGridComponentProps);
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface ICommonControlPropertyGridComponentProps {
        controls?: BABYLON.GUI.Control[];
        control?: BABYLON.GUI.Control;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class CommonControlPropertyGridComponent extends React.Component<ICommonControlPropertyGridComponentProps> {
        constructor(props: ICommonControlPropertyGridComponentProps);
        renderGridInformation(control: BABYLON.GUI.Control): JSX.Element | null;
        render(): JSX.Element | undefined;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IControlPropertyGridComponentProps {
        control: BABYLON.GUI.Control;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ControlPropertyGridComponent extends React.Component<IControlPropertyGridComponentProps> {
        constructor(props: IControlPropertyGridComponentProps);
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IEllipsePropertyGridComponentProps {
        ellipse: BABYLON.GUI.Ellipse;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class EllipsePropertyGridComponent extends React.Component<IEllipsePropertyGridComponentProps> {
        constructor(props: IEllipsePropertyGridComponentProps);
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IGridPropertyGridComponentProps {
        grid: BABYLON.GUI.Grid;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class GridPropertyGridComponent extends React.Component<IGridPropertyGridComponentProps> {
        constructor(props: IGridPropertyGridComponentProps);
        renderRows(): JSX.Element[];
        renderColumns(): JSX.Element[];
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IImageBasedSliderPropertyGridComponentProps {
        imageBasedSlider: BABYLON.GUI.ImageBasedSlider;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ImageBasedSliderPropertyGridComponent extends React.Component<IImageBasedSliderPropertyGridComponentProps> {
        constructor(props: IImageBasedSliderPropertyGridComponentProps);
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IImagePropertyGridComponentProps {
        image: BABYLON.GUI.Image;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ImagePropertyGridComponent extends React.Component<IImagePropertyGridComponentProps> {
        constructor(props: IImagePropertyGridComponentProps);
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IInputTextPropertyGridComponentProps {
        inputText: BABYLON.GUI.InputText;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class InputTextPropertyGridComponent extends React.Component<IInputTextPropertyGridComponentProps> {
        constructor(props: IInputTextPropertyGridComponentProps);
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface ILinePropertyGridComponentProps {
        line: BABYLON.GUI.Line;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class LinePropertyGridComponent extends React.Component<ILinePropertyGridComponentProps> {
        constructor(props: ILinePropertyGridComponentProps);
        onDashChange(value: string): void;
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IRadioButtonPropertyGridComponentProps {
        radioButtons: BABYLON.GUI.RadioButton[];
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class RadioButtonPropertyGridComponent extends React.Component<IRadioButtonPropertyGridComponentProps> {
        constructor(props: IRadioButtonPropertyGridComponentProps);
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IRectanglePropertyGridComponentProps {
        rectangle: BABYLON.GUI.Rectangle;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class RectanglePropertyGridComponent extends React.Component<IRectanglePropertyGridComponentProps> {
        constructor(props: IRectanglePropertyGridComponentProps);
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IScrollViewerPropertyGridComponentProps {
        scrollViewer: BABYLON.GUI.ScrollViewer;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ScrollViewerPropertyGridComponent extends React.Component<IScrollViewerPropertyGridComponentProps> {
        constructor(props: IScrollViewerPropertyGridComponentProps);
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface ISliderPropertyGridComponentProps {
        slider: BABYLON.GUI.Slider;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class SliderPropertyGridComponent extends React.Component<ISliderPropertyGridComponentProps> {
        constructor(props: ISliderPropertyGridComponentProps);
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface IStackPanelPropertyGridComponentProps {
        stackPanel: BABYLON.GUI.StackPanel;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class StackPanelPropertyGridComponent extends React.Component<IStackPanelPropertyGridComponentProps> {
        constructor(props: IStackPanelPropertyGridComponentProps);
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        interface ITextBlockPropertyGridComponentProps {
        textBlock: BABYLON.GUI.TextBlock;
        lockObject: BABYLON.NodeEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<BABYLON.NodeEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class TextBlockPropertyGridComponent extends React.Component<ITextBlockPropertyGridComponentProps> {
        constructor(props: ITextBlockPropertyGridComponentProps);
        render(): JSX.Element;
    }



}
declare module BABYLON.NodeEditor {

}
declare module BABYLON.NodeEditor.SharedUIComponents {
        /**
     * Class used to provide lock mechanism
     */
    export class LockObject {
        /**
         * Gets or set if the lock is engaged
         */
        lock: boolean;
    }



}
declare module BABYLON.NodeEditor {

}


