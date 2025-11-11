import { Response } from "express";
import mongoose from "mongoose";
import * as Yup from "yup";

type Pagination = {
  totalPages: number;
  current: number;
  total: number;
};

export default {
  success(res: Response, data: any, message: string) {
    res.status(200).json({
      success: true,
      message,
      data,
    });
  },

  error(res: Response, error: unknown, message: string) {
    if (error instanceof Yup.ValidationError) {
      return res.status(400).json({
        success: false,
        message,
        data: {
          [`${error.path}`]: error.errors[0],
        },
      });
    }

    if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
        data: null,
      });
    }

    if (error instanceof mongoose.Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error.name,
      });
    }

    if ((error as any)?.code) {
      const _err = error as any;
      return res.status(500).json({
        success: false,
        message: _err?.errorResponse?.errmsg || "server error",
        data: _err,
      });
    }

    res.status(500).json({
      success: false,
      message,
      data: error,
    });
  },

  unauthorized(res: Response, message: string = "unauthorized") {
    res.status(401).json({
      success: false,
      message,
      data: null,
    });
  },

  notFound(res: Response, message: string = "not found") {
    res.status(404).json({
      success: false,
      message,
      data: null,
    });
  },

  pagination(
    res: Response,
    data: any,
    pagination: Pagination,
    message: string
  ) {
    res.status(200).json({
      success: true,
      message,
      data,
      pagination,
    });
  },
};
