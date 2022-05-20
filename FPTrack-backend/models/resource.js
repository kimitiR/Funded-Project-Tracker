var mongoose = require('mongoose');
var Promise = require('promise');

var Schema = mongoose.Schema;


// assigned_by user MUST be resource_mgr
var AssignmentSchema = new Schema(
    {
        assignee: {
            type: Schema.Types.ObjectId,
            ref: 'project',
            required: true,
        },
        assigned_on: {
            type: Date,
            required: true
        },
        assigned_by: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        }
    }
)

// Key validation points:
// - If is_multi_assignable is 'false', allow ONLY ONE element in assigned_to
// - (add on ...)
ResourceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 100
        },
        description: {
            type: String,
            required: false
        },
        scan_code: {
            type: String,
            required: false
        },
        kind: {
            type: String,
            enum: ['software', 'hardware'],
            required: true
        },
        // if required, eg: for a software license
        expiry: {
            type: Date,
            required: false
        },
        assigned_to: {
            type: [AssignmentSchema],
            default: () => { }
        },
        // mainly for equipments like GPU, Software access, etc.
        is_multi_assignable: {
            type: Boolean,
            required: true
        },
        // Store only most recent fault here --- history will be maintained in a separate 
        // `tokens` collection
        faulted_at: {
            type: Date,
            default: null
        },
        deleted_at: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: {
            created_at: 'created_at',
            modified_at: 'modified_at'
        }
    }
);

//-- 

ResourceSchema
    .statics
    .onlyExisting = function () {
        return this.find().onlyExisiting();
    };

ResourceSchema
    .query
    .onlyExisting = function () {
        return this.find({
            deleted_at: null
        });
    };

//--

// virtual for URL
ResourceSchema
    .virtual('url')
    .get(function () {
        return '/api/resource/' + this._id;
    });


module.exports = mongoose.model('resource', ResourceSchema);