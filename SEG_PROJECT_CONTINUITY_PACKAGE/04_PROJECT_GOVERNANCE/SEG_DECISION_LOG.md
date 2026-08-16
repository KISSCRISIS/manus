# SEG Decision Log

| ID | Decision | Status | Source / evidence |
|---|---|---|---|
| D-001 | اعتماد Visual Freeze للنطاق المرئي الموافق عليه | Accepted | `SEG_FINAL_VISUAL_FREEZE_ACCEPTANCE_DECISION.md` |
| D-002 | إبقاء Dashboard كمسار محمي واحد مع مراسي الأقسام الداخلية | Accepted | `SEG_DASHBOARD_UX_FINAL_REPORT.md` |
| D-003 | عدم تفعيل Medical Journal أو البحث أو المقالات دون حزمة مصدر وحوكمة مكتملة | Accepted / Blocking gate | `SEG_FINAL_CONTENT_PREPARATION_DECISION_REPORT.md` |
| D-004 | إبقاء Drug Reference خارج النطاق حتى تدقيق واعتماد مستقل | Accepted | `SEG_RELEASE_ORCHESTRATOR.md` |
| D-005 | اعتماد Option A للجاهزية الإنتاجية مع Vite/Express بدلاً من هجرة فورية إلى Next.js | Accepted | `SEG_PRODUCTION_READINESS.md` |
| D-006 | إبقاء هجرة Next.js اختيارية ومؤجلة إلى checkpoint مستقل | Accepted | `SEG_NEXTJS_MIGRATION_PLAN.md` |
| D-007 | عدم رفع `.env` أو الأسرار أو `node_modules` إلى حزمة النقل أو مستودع عام | Accepted | `SEG_TRANSFER_README.md` and delivery checks |
| D-008 | استخدام managed/static media registry وعدم إدخال صور مرجعية أو screenshots كأصول واجهة | Accepted | `SEG_VISUAL_ASSET_REGISTRY_FINAL_REPORT.md` and `SEG_ARCHITECTURE_RULES.md` |
| D-009 | الحالة الحالية قبل أي تنفيذ جديد هي Post Visual Freeze Evidence Closure | Superseded by D-011 checkpoint handoff | `LAST_MANUS_STATE.md` |
| D-010 | إغلاق Accessibility Review بعد اجتياز A11Y-01 إلى A11Y-06 والاختبارات المستهدفة والبناء، دون إعادة فتح Visual Freeze | Accepted / Completed command | `SEG_ACCESSIBILITY_REVIEW_FINAL_REPORT.md` |
| D-011 | جعل Production Readiness Check هو الأمر التالي المصرح به، مع إبقاء OAuth وقاعدة البيانات والمسارات المحمية والمحتوى الطبي خارج النطاق | Current checkpoint | `LAST_MANUS_STATE.md` and `NEXT_PENDING_COMMANDS.md` |

## Decision protocol

أي قرار جديد يجب أن يذكر النطاق، السبب، الملفات المتأثرة، المخاطر، طريقة التحقق، وخطة التراجع. لا يُعتبر الكلام غير الموثق داخل مهمة سابقة تفويضاً دائماً لتغيير الكود أو المحتوى أو البنية.

| D-012 | نشر المصدر النهائي المفحوص إلى `KISSCRISIS/manus` على `main` مع استبعاد الأسرار والاعتماديات وملفات البناء المؤقتة | Accepted / Completed | `SEG_GITHUB_UPLOAD_MANIFEST.md`; commit `42e21eb43ae2371625a960c92210d103bd972d76`; remote verified with 288 tracked files. The repository is public; no visibility change was performed. |
