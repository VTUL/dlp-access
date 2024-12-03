import React, { useEffect } from "react";
import { registerBuiltInLoaders } from "@babylonjs/loaders/dynamic";
import * as BABYLON from "@babylonjs/core";
import { GridMaterial } from "@babylonjs/materials/";
import "../css/_3dViewer.scss";

const BabylonElement = (props) => {
  const disableScroll = () => {
    [document.body, document.html].forEach((el) => {
      el?.classList.add("no-scroll");
    });
  };

  const enableScroll = () => {
    [document.body, document.html].forEach((el) => {
      el?.classList.remove("no-scroll");
    });
  };

  const addListeners = (canvas, engine) => {
    canvas.addEventListener("mouseover", disableScroll);
    canvas.addEventListener("mouseout", enableScroll);

    window.addEventListener("resize", () => {
      engine.resize();
    });
  };

  const removeListeners = (canvas, engine) => {
    canvas.removeEventListener("mouseover", disableScroll);
    canvas.removeEventListener("mouseout", enableScroll);

    window.removeEventListener("resize", () => {
      engine.resize();
    });
  };

  const createScene = async (canvas, engine, modelURL) => {
    const AXES_LENGTH = 10;
    const scene = new BABYLON.Scene(engine);
    scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
      props.env,
      scene
    );
    const ground = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: AXES_LENGTH, height: AXES_LENGTH, updatable: false },
      scene
    );
    const grid = new GridMaterial("grid", scene);
    grid.backFaceCulling = false;
    grid.mainColor = BABYLON.Color3.White();
    grid.lineColor = BABYLON.Color3.White();
    grid.opacity = 0.25;

    ground.material = grid;
    ground.alwaysSelectAsActiveMesh = true;
    ground.isPickable = false;

    // scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    const model = await loadModel(scene, modelURL);
    const modelDimensions = model.ellipsoid;
    const modelMaxSize = Math.max(
      modelDimensions._x,
      modelDimensions._y,
      modelDimensions._z
    );
    console.log(modelDimensions);
    model.position = new BABYLON.Vector3(0, modelDimensions._y, 0);
    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      0,
      modelDimensions._y,
      4,
      new BABYLON.Vector3(0, modelDimensions._y, 0),
      scene
    );
    camera.setPosition(
      new BABYLON.Vector3(0, modelDimensions._y, modelMaxSize * 2)
    );
    camera.setTarget(
      new BABYLON.Vector3(0, modelDimensions._y, modelMaxSize * 2)
    );
    camera.wheelPrecision = 100;
    camera.lowerRadiusLimit = modelMaxSize;
    camera.upperRadiusLimit = modelMaxSize * 10;
    camera.attachControl(canvas, true);
    camera.minZ = 0.1;

    engine.runRenderLoop(function () {
      camera.setTarget(model.position);
      scene.render();
    });
  };

  const createCanvas = (canvasWrapper) => {
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "three-d-canvas";
    canvasWrapper.innerHTML = "";
    canvasWrapper.appendChild(canvas);

    return canvas;
  };

  const loadModel = async (scene, url) => {
    const filename = url.split("/").pop();
    const path = url.replace(filename, "");
    const response = await BABYLON.SceneLoader.ImportMeshAsync(
      null,
      path,
      filename,
      scene
    );
    const model = response.meshes[0];

    return model;
  };

  useEffect(() => {
    registerBuiltInLoaders();
    const canvasWrapper = document.getElementById("canvas-wrapper");
    const canvas = createCanvas(canvasWrapper);
    const engine = new BABYLON.Engine(canvas, true);

    createScene(canvas, engine, props.model);

    addListeners(canvas, engine);

    return () => {
      removeListeners(canvas, engine);
      enableScroll();
      engine.dispose();
    };
  }, [props.model]);

  return (
    <section style={{ width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "100%", alignItems: "center" }}>
        <div id="canvas-wrapper"></div>
      </div>
    </section>
  );
};

export default BabylonElement;
