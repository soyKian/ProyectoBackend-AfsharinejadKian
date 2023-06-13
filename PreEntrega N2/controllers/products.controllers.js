import {
    getAllService,
    getByIdService,
    addService,
    updateService,
    deleteService,
    checkDuplicateCode
  } from "../services/products.services.js";
  
  export const getController = async (req, res, next) => {
    try {
      let { page, limit, sort, filter } = req.query;
      page == null ? (page = 1) : (page = page);
      const result = await getAllService(page, limit, sort, filter);
      const prevPageLink = result.hasPrevPage
        ? `http://localhost:8080/api/products?page=${result.prevPage}`
        : null;
      const nextPageLink = result.hasNextPage
        ? `http://localhost:8080/api/products?page=${result.nextPage}`
        : null;
      res.json({
        status: result ? "success" : "error",
        payload: result.docs,
        info: {
          totalDocs: result.totalDocs,
          totalPages: result.totalPages,
          currPage: Number(page),
          prevPage: result.prevPage,
          nextPage: result.nextPage,
          hasPrevPage: result.hasPrevPage,
          hasNextPage: result.hasNextPage,
          prevPageLink,
          nextPageLink,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const getByIdController = async (req, res, next) => {
    try {
      const { id } = req.params;
      const docs = await getByIdService(id);
      
      res.status(200).send(docs);
    } catch (error) {
      next(error);
    }
  };
  
  export const addController = async (req, res, next) => {
    try {
      const {
        title,
        description,
        price,
        code,
        category,
        stock,
        thumbnails,
        status = true
      } = req.body;
  
      await checkDuplicateCode(code);
      
      const newDoc = await addService({
        title,
        description,
        price,
        code,
        category,
        stock,
        thumbnails,
        status,
      });
      res.status(201).json(newDoc);
    
    } catch (error) {
      next(error);
    }
  };
  
  export const updateController = async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        price,
        code,
        category,
        stock,
        thumbnails,
        status,
      } = req.body;
      await getByIdService(id);
  
      const prodUpdated = await updateService(id,{
        title,
        description,
        price,
        code,
        category,
        stock,
        thumbnails,
        status,
      });
      res.status(200).send(prodUpdated);
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteController = async (req, res, next) => {
    try {
      const { id } = req.params;
      const productDeleted = await deleteService(id);
      res.status(200).send(productDeleted);
    } catch (error) {
      next(error);
    }
  };