(()=>{const e=document.getElementById("babylon-canvas"),n=new BABYLON.Engine(e,!0);class t{static CreateScene(e,n){const t=new BABYLON.Scene(e),r=new BABYLON.FreeCamera("camera1",new BABYLON.Vector3(0,5,-10),t);return r.setTarget(BABYLON.Vector3.Zero()),r.attachControl(n,!0),new BABYLON.HemisphericLight("light1",new BABYLON.Vector3(0,1,0),t).intensity=.7,BABYLON.MeshBuilder.CreateSphere("sphere",{diameter:2,segments:32},t).position.y=1,BABYLON.MeshBuilder.CreateGround("ground",{width:6,height:6},t),t}}t.CreateScene(n,e);const r=t.CreateScene(n,e);n.runRenderLoop((function(){r.render()})),window.addEventListener("resize",(function(){n.resize()}))})();
//# sourceMappingURL=sceneTs.js.map