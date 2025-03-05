import implementation from "./implementation";

declare function shim(): typeof implementation;

export = shim;

