import React, { useEffect } from "react";
import { registerBuiltInLoaders } from "@babylonjs/loaders/dynamic";
import * as BABYLON from "@babylonjs/core";
import "../css/_3dViewer.scss";

const BabylonElement = (props) => {
  useEffect(() => {
    registerBuiltInLoaders();
    const canvasWrapper = document.getElementById("canvas-wrapper");
    const canvas = createCanvas(canvasWrapper);
    const engine = new BABYLON.Engine(canvas, true);
    const createScene = () => {
      const scene = new BABYLON.Scene(engine);
      // const camera = new BABYLON.FreeCamera("camera1",
      //     new BABYLON.Vector3(0, 5, -10), scene);

      // The first parameter can be used to specify which mesh to import. Here we import all meshes
      // const env = loadModel(scene, props.env);
      const model = loadModel(scene, props.model);
      const camera = new BABYLON.ArcRotateCamera(
        "camera",
        -Math.PI / 2,
        Math.PI / 2.5,
        4,
        new BABYLON.Vector3(0, 0, 0),
        scene
      );
      camera.setTarget(BABYLON.Vector3.Zero());
      camera.attachControl(canvas, true);
      camera.speed = 0.25;
      //temporary light to light the entire scene
      const light0 = new BABYLON.HemisphericLight(
        "HemiLight",
        new BABYLON.Vector3(0, 1, 0),
        scene
      );
      // const light = new BABYLON.PointLight("sparklight", new BABYLON.Vector3(0, 0, 0), scene);
      // light.diffuse = new BABYLON.Color3(0.08627450980392157, 0.10980392156862745, 0.15294117647058825);
      // light.intensity = 35;
      // light.radius = 1;

      return scene;
    };
    const scene = createScene();

    engine.runRenderLoop(function () {
      scene.render();
    });

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

    canvas.addEventListener("mouseover", function () {
      disableScroll();
    });

    canvas.addEventListener("mouseout", function () {
      enableScroll();
    });

    window.addEventListener("resize", function () {
      engine.resize();
    });

    return () => {
      engine.dispose();
      enableScroll();
    };
  }, [props.model]);

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
    const allMeshes = model.getChildMeshes();

    return { model, allMeshes };
  };

  return (
    <section style={{ width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "100%", alignItems: "center" }}>
        <div id="canvas-wrapper"></div>
      </div>
    </section>
  );
};

export default BabylonElement;
