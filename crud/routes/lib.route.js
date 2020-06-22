const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const lib_controller = require('../controllers/lib.controller');

router.get('/', lib_controller.home);
router.get('/book/list', lib_controller.book_list);
router.post('/book/create', lib_controller.book_create);
router.get('/book/enter', lib_controller.book_enter);
router.get('/book/copy', lib_controller.book_copy);
router.post('/book/getByid', lib_controller.book_getByid);
router.post('/book/delete', lib_controller.book_delete);

router.get('/subject/list', lib_controller.subject_list);
router.get('/subject/enter', lib_controller.subject_enter);
router.get('/subject/copy', lib_controller.subject_copy);
router.post('/subject/create', lib_controller.subject_create);
router.post('/subject/getByid', lib_controller.subject_getByid);
router.post('/subject/delete', lib_controller.subject_delete);


router.get('/doctype/list', lib_controller.doctype_list);
router.get('/doctype/enter', lib_controller.doctype_enter);
router.get('/doctype/copy', lib_controller.doctype_copy);
router.post('/doctype/create', lib_controller.doctype_create);
router.post('/doctype/getByid', lib_controller.doctype_getByid);
router.post('/doctype/delete', lib_controller.doctype_delete);

router.get('/document/list', lib_controller.document_list);
router.get('/document/enter', lib_controller.document_enter);
router.get('/document/copy', lib_controller.document_copy);
router.post('/document/create', lib_controller.document_create);
router.post('/document/getByid', lib_controller.document_getByid);
router.post('/document/delete', lib_controller.document_delete);


router.get('/trantype/list', lib_controller.trantype_list);
router.get('/trantype/enter', lib_controller.trantype_enter);
router.get('/trantype/copy', lib_controller.trantype_copy);
router.post('/trantype/create', lib_controller.trantype_create);
router.post('/trantype/getByid', lib_controller.trantype_getByid);
router.post('/trantype/delete', lib_controller.trantype_delete);


router.get('/teacher/list', lib_controller.teacher_list);
router.get('/teacher/enter', lib_controller.teacher_enter);
router.get('/teacher/copy', lib_controller.teacher_copy);
router.post('/teacher/create', lib_controller.teacher_create);
router.post('/teacher/getByid', lib_controller.teacher_getByid);
router.post('/teacher/delete', lib_controller.teacher_delete);

router.get('/transaction/list', lib_controller.transaction_list);
router.get('/transaction/enter', lib_controller.transaction_enter);
router.get('/transaction/copy', lib_controller.transaction_copy);
router.post('/transaction/create', lib_controller.transaction_create);
router.post('/transaction/getByid', lib_controller.transaction_getByid);
router.post('/transaction/delete', lib_controller.transaction_delete);

router.get('/entity/list', lib_controller.entity_list);
router.get('/entity/enter', lib_controller.entity_enter);
router.get('/entity/copy', lib_controller.entity_copy);
router.post('/entity/create', lib_controller.entity_create);
router.post('/entity/getByid', lib_controller.entity_getByid);
router.post('/entity/delete', lib_controller.entity_delete);

router.get('/entry/list', lib_controller.entry_list);
router.get('/entry/enter', lib_controller.entry_enter);
router.get('/entry/copy', lib_controller.entry_copy);
router.post('/entry/create', lib_controller.entry_create);
router.post('/entry/getByid', lib_controller.entry_getByid);
router.post('/entry/delete', lib_controller.entry_delete);

router.post('/redis/set', lib_controller.redis_set);
router.get('/redis/refresh', lib_controller.redis_refresh);
router.get('/redis/get', lib_controller.redis_get);

router.post('/ok', lib_controller.ok);
router.get('/ok', lib_controller.ok);

router.get('/report/book', lib_controller.rptbook);
router.get('/report/teacher', lib_controller.rptteacher);
router.get('/report/transaction', lib_controller.rpttransaction);
router.get('/report/trantype', lib_controller.rpttrantype);
router.get('/report/document', lib_controller.rptdocument);
router.get('/report/subject', lib_controller.rptsubject);
router.get('/report/entry', lib_controller.rptentry);

router.get('/transaction', lib_controller.getTransaction);
router.get('/trantype', lib_controller.getTrantype);
router.get('/book', lib_controller.getBook);
router.get('/teacher', lib_controller.getTeacher);
router.get('/document', lib_controller.getDocument);
router.get('/subject', lib_controller.getSubject);
router.get('/entry', lib_controller.getEntry);

module.exports = router;