"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionStatus = exports.IntentStatus = void 0;
var IntentStatus;
(function (IntentStatus) {
    IntentStatus["PENDING"] = "pending";
    IntentStatus["VERIFIED"] = "verified";
    IntentStatus["EXECUTING"] = "executing";
    IntentStatus["COMPLETED"] = "completed";
    IntentStatus["FAILED"] = "failed";
    IntentStatus["CANCELLED"] = "cancelled";
})(IntentStatus || (exports.IntentStatus = IntentStatus = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["PENDING"] = "pending";
    TransactionStatus["SUBMITTED"] = "submitted";
    TransactionStatus["CONFIRMED"] = "confirmed";
    TransactionStatus["FAILED"] = "failed";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
//# sourceMappingURL=index.js.map