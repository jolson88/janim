/**
 * Fills the entire canvas with a given color
 * @param canvas The canvas to fill
 * @param color The CSS color string to fill the canvas with
 */
export function fill(canvas: HTMLCanvasElement, color: string): void {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
