import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export const throwError = (
  message: string,
  status: ContentfulStatusCode = 500
): never => {
  throw new HTTPException(status, {
    message,
    res: new Response(
      JSON.stringify({
        success: false,
        message,
        timestamp: new Date().toISOString(),
      }),
      {
        status,
        headers: {
          "Content-Type": "application/json",
        },
      }
    ),
  });
};

export const StatusErrors = {
  BadRequest: (msg = "Bad Request") => throwError(msg, 400),
  Unauthorized: (msg = "Unauthorized") => throwError(msg, 401),
  Forbidden: (msg = "Forbidden") => throwError(msg, 403),
  NotFound: (msg = "Resource Not Found") => throwError(msg, 404),
  Conflict: (msg = "Conflict") => throwError(msg, 409),
  TooManyRequest: (msg = "Too many request") => throwError(msg, 429),
  Internal: (msg = "Internal Server Error") => throwError(msg, 500),
};
