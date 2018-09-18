import { Function, ITime, StyleFunction } from './types';

/**
 * Outlines shapes with solid outline and no fill
 * @param lineSize The size of the line making the outline
 * @param color Function that returns a color given the time
 * @returns Function that given the rendering context and time, configures the context style
 */
export function outline(lineSize: number, color: Function<ITime, string>): StyleFunction {
    return (ctx, t) => {
        ctx.strokeStyle = color(t);
        ctx.lineWidth = lineSize;
    };
}
