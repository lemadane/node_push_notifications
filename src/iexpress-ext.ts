import { Express } from "express";

export interface IExpressExt extends Express {
  port?: number;
  host?: string;
}