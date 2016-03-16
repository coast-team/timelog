
var Logger = (function () {
  "use strict";

  var result = function (a_name, a_consumer) {
    this._buffer_ = [];
    this._name_ = a_name;
    this._consumer = a_consumer;
  };

  Logger.prototype = {
    constructor: result,

    // Constants
    Sent_operation_tag: "sent",

    Received_operation_tag: "received",

    Integrated_operation_tag: "integrated",

    // Access
    _representation_of: function (a_op_id, a_site_id, a_timestamp, a_event_tag) {
      return {
        id: a_op_id,
        site_id: a_site_id,
        timestamp: a_timestamp,
        event: a_event_tag
      };
    },

    // change
    log_sent_operation: function (a_op_id, a_site_id, a_timestamp) {
      this._buffer_[this.buffer.length] = this._representation_of (a_op_id, a_site_id, a_timestamp, this.Sent_operation_tag);
    },

    log_received_operation: function (a_op_id, a_site_id, a_timestamp) {
      this._buffer_[this.buffer.length] = this._representation_of (a_op_id, a_site_id, a_timestamp, this.Received_operation_tag);
    },

    log_integrated_operation: function (a_op_id, a_site_id, a_timestamp) {
      this._buffer_[this.buffer.length] = this._representation_of (a_op_id, a_site_id, a_timestamp, this.Integrated_operation_tag);
    },

    flush: function () {
      var json = JSON.stringify (this._buffer_);
      this._consumer(this._name_, json);

      this._buffer_ = [];
    }
  };

  return result;
})();