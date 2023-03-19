"use strict";
import express from "express";
import { login } from "../controllers/ActorController.js";

const v2 = express.Router();

v2.route("/").post(login);

export const loginV2 = v2;

