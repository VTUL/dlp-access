import React, { useEffect } from "react";
import { registerBuiltInLoaders } from "@babylonjs/loaders/dynamic";
import * as BABYLON from "@babylonjs/core";
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
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    const model = await loadModel(scene, modelURL);
    const modelDimensions = model.ellipsoid;
    const modelMaxSize = Math.max(
      modelDimensions._x,
      modelDimensions._y,
      modelDimensions._z
    );
    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      0,
      0,
      4,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera.setPosition(new BABYLON.Vector3(0, 0, modelMaxSize * 2));
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.lowerRadiusLimit = modelMaxSize;
    camera.upperRadiusLimit = modelMaxSize * 10;
    camera.attachControl(canvas, true);
    camera.speed = 0.1;
    camera.minZ = 0.1;
    //temporary light to light the entire scene
    const light0 = new BABYLON.HemisphericLight(
      "HemiLight",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );

    engine.runRenderLoop(function () {
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
