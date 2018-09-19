import * as R from 'ramda';
import {
    ITime,
    ITransform,
    StyleFunction,
    TimeFunction,
} from './janim';

/**
 * Creates an ellipse that is animated over time
 * @param canvas The canvas to draw the shape on
 * @param transform A set of transforms that determine the position, size, and rotation of the shape
 * @param style A function that, given the time, styles the shape as specified
 * @returns Function that accepts the current point in time and draws the ellipse
 */
export function animatedEllipse(
    canvas: HTMLCanvasElement,
    transform: ITransform,
    style: StyleFunction,
): TimeFunction<void> {
    const ctx = canvas.getContext('2d');
    return (t) => {
        const pos = transform.position(t);
        const radii = transform.size(t);
        const rotation = transform.rotation(t);
        if (ctx.ellipse) {
            ctx.beginPath();
            ctx.ellipse(pos.x, pos.y, radii.width, radii.height, rotation, 0, 2 * Math.PI);
            style(ctx, t);
        } else {
            // Backup if Ellipse function is not provided (IE)
            ctx.save();
            ctx.beginPath();
            ctx.rotate(rotation);
            ctx.setTransform(1, 0, 0, radii.height / radii.width, pos.x, pos.y);
            ctx.arc(0, 0, radii.width, 0, 2 * Math.PI);
            style(ctx, t);
            ctx.restore();
        }
    };
}

/**
 * Creates a rectangle that is animated over time
 * @param canvas The canvas to draw the shape on
 * @param transform A set of transforms that determine the position, size, and rotation of the shape
 * @param style A function that, given the time, styles the shape as specified
 * @returns Function that accepts the current point in time and draws the ellipse
 */
export function animatedRect(
    canvas: HTMLCanvasElement,
    transform: ITransform,
    style: StyleFunction,
): TimeFunction<void> {
    const ctx = canvas.getContext('2d');
    return (t) => {
        const pos = transform.position(t);
        const size = transform.size(t);
        const rotation = transform.rotation(t);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.beginPath();
        ctx.translate(pos.x + (size.width / 2), pos.y + (size.height / 2));
        ctx.rotate(rotation);
        ctx.rect(-(size.width / 2), -(size.height / 2), size.width, size.height);
        style(ctx, t);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
}
/**
 * Clears the entire canvas with a given color
 * @param canvas The canvas to fill
 * @param color The CSS color string to fill the canvas with
 */
export function clear(canvas: HTMLCanvasElement, color: string): void {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
