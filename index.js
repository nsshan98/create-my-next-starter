#!/usr/bin/env node
import inquirer from "inquirer";
import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// ----------------------------
// Detect package manager
// ----------------------------
const getUserPackageManager = () => {
  const userAgent = process.env.npm_config_user_agent || "";
  if (userAgent.startsWith("pnpm")) return "pnpm";
  if (userAgent.startsWith("yarn")) return "yarn";
  return "npm";
};

// ----------------------------
// Copy boilerplate
// ----------------------------
const copyBoilerplate = (sourceDir, targetDir) => {
  if (!fs.existsSync(sourceDir)) {
    console.error(`❌ Boilerplate folder not found: ${sourceDir}`);
    process.exit(1);
  }
  fs.cpSync(sourceDir, targetDir, { recursive: true });
};

// ----------------------------
// Install dependencies
// ----------------------------
const installDependencies = (pkgManager, deps, dev = false, cwd) => {
  if (!deps || deps.length === 0) return;
  let cmd = "";
  switch (pkgManager) {
    case "npm":
      cmd = `npm install ${dev ? "--save-dev" : ""} ${deps.join(" ")}`;
      break;
    case "yarn":
      cmd = `yarn add ${deps.join(" ")} ${dev ? "--dev" : ""}`;
      break;
    case "pnpm":
      cmd = `pnpm add ${deps.join(" ")} ${dev ? "-D" : ""}`;
      break;
  }
  console.log(`📦 Running: ${cmd}`);
  execSync(cmd, { stdio: "inherit", cwd });
};

// ----------------------------
// Paths
// ----------------------------
const cliDir = path.dirname(fileURLToPath(import.meta.url));
const boilerplatesDir = path.join(cliDir, "boilerplates");

// ----------------------------
// Main
// ----------------------------
const run = async () => {
  // ----------------------------
  // Project name
  // ----------------------------
  const projectName = process.argv[2];
  if (!projectName) {
    console.error("❌ Please provide a project name. Example: create-my-next-starter my-app");
    process.exit(1);
  }

  // ----------------------------
  // Package manager
  // ----------------------------
  const detectedPkgManager = getUserPackageManager();
  const { chosenPkgManager } = await inquirer.prompt([
    {
      type: "list",
      name: "chosenPkgManager",
      message: `✨ Detected package manager: ${detectedPkgManager}. Please confirm:`,
      choices: ["pnpm", "npm", "yarn"],
      default: detectedPkgManager,
    },
  ]);

  // ----------------------------
  // UI selection
  // ----------------------------
  const { ui } = await inquirer.prompt([
    {
      type: "list",
      name: "ui",
      message: "Which UI library do you want?",
      choices: ["Tailwind only", "ShadCN UI", "Material UI (MUI)"],
    },
  ]);

  // ----------------------------
  // Create project folder
  // ----------------------------
  const targetDir = path.join(process.cwd(), projectName);
  if (fs.existsSync(targetDir)) {
    console.error(`❌ Folder "${projectName}" already exists.`);
    process.exit(1);
  }
  fs.mkdirSync(targetDir);

  // ----------------------------
  // Initialize Next.js project
  // ----------------------------
  console.log("\n🚀 Creating full Next.js project...");
  let nextCmd = `npx create-next-app@latest ${targetDir} --eslint --tailwind --app`;
  execSync(nextCmd, { stdio: "inherit" });

  // ----------------------------
  // Determine boilerplate and extra deps
  // ----------------------------
  let sourceFolder;
  let dependencies = [];
  let devDependencies = ["standard-version", "zod"];

  switch (ui) {
    case "Tailwind only":
      sourceFolder = path.join(boilerplatesDir, "none");
      dependencies = [
        "@hookform/resolvers",
        "@tanstack/react-query",
        "axios",
        "react-hook-form",
        "react-icons",
      ];
      devDependencies.push("tailwindcss", "postcss", "autoprefixer");
      break;

    case "ShadCN UI":
      sourceFolder = path.join(boilerplatesDir, "shadcn");
      dependencies = [
        "@hookform/resolvers",
        "@tanstack/react-query",
        "axios",
        "react-hook-form",
        "react-icons",
        "lucide-react",
        "clsx",
        "tailwind-merge",
        "class-variance-authority",
        "shadcn-ui",
      ];
      devDependencies.push("tailwindcss", "postcss", "autoprefixer");
      break;

    case "Material UI (MUI)":
      sourceFolder = path.join(boilerplatesDir, "mui");
      dependencies = [
        "@mui/material",
        "@mui/icons-material",
        "@emotion/react",
        "@emotion/styled",
        "@hookform/resolvers",
        "@tanstack/react-query",
        "axios",
        "react-hook-form",
      ];
      break;
  }

  // ----------------------------
  // Copy boilerplate (merge with Next.js src)
  // ----------------------------
  console.log(`\n📂 Copying boilerplate for ${ui}...`);
  copyBoilerplate(sourceFolder, targetDir);

  // ----------------------------
  // Install extra dependencies
  // ----------------------------
  console.log("\n📦 Installing additional dependencies...");
  installDependencies(chosenPkgManager, dependencies, false, targetDir);
  installDependencies(chosenPkgManager, devDependencies, true, targetDir);

  // ----------------------------
  // ShadCN initialization
  // ----------------------------
  if (ui === "ShadCN UI") {
    console.log("\n✨ Initializing ShadCN UI...");
    execSync("npx shadcn@latest init", { stdio: "inherit", cwd: targetDir });
  }

  console.log(`\n✅ Project "${projectName}" setup complete!`);
};

run();