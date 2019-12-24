export {}

/* typal node_modules/@multipart/form-data/types/index.xml ignore:_goa.BusBoyLimits namespace */
/**
 * @typedef {_multipart.FormDataConfig} FormDataConfig The configuration for the instance.
 * @typedef {Object} _multipart.FormDataConfig The configuration for the instance.
 * @prop {string} [dest] The directory where to store the files using the `DiskStorage`. If not specified, files will be saved in the system's temp directory (`os.tmpdir()`).
 * @prop {_multipart.FormDataStorageEngine} [storage] An _instance_ of a custom storage engine.
 * @prop {_multipart.FormDataFileFilter} [fileFilter] The file filter.
 * @prop {_goa.BusBoyLimits} [limits] The limits of the uploaded data.
 * @prop {boolean} [preservePath=false] Whether to keep the full path of files instead of just the base name. Default `false`.
 */

/* typal node_modules/@multipart/form-data/types/disk-storage.xml namespace */
/**
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 * @typedef {_multipart.FormDataDiskStorageOptions} FormDataDiskStorageOptions `＠record`
 * @typedef {Object} _multipart.FormDataDiskStorageOptions `＠record`
 * @prop {string|function(http.IncomingMessage, _multipart.FormDataFile): !Promise<string>} [destination] Used to determine within which folder the uploaded files should be stored. If given as a string, the location will be ensured prior at the start. Default is `tmpdir()`.
 * @prop {(req: !http.IncomingMessage, file: !_multipart.FormDataFile) => !Promise<string>} [filename] Used to determine what the file should be named inside the folder. If no filename is given, each file will be given a random name that doesn't include any file extension.
 */

/* typal node_modules/@multipart/form-data/types/file.xml namespace */
/**
 * @typedef {import('stream').Readable} stream.Readable
 * @typedef {_multipart.FormDataFile} FormDataFile `＠record` The information about each file.
 * @typedef {Object} _multipart.FormDataFile `＠record` The information about each file.
 * @prop {string} fieldname The field name specified in the form.
 * @prop {string} originalname The name of the file on the user's computer.
 * @prop {string} encoding The encoding type of the file.
 * @prop {string} mimetype The mime type of the file.
 * @prop {number} size The size of the file in bytes.
 * @prop {string} destination The folder to which the file has been saved. Set by _DiskStorage_.
 * @prop {string} filename The name of the file within the `destination`. Set by _DiskStorage_.
 * @prop {string} path The full path to the uploaded file. Set by _DiskStorage_.
 * @prop {Buffer} buffer The `Buffer` of the entire file. Set by _MemoryStorage_.
 * @prop {stream.Readable} stream The _Readable_ stream with the file data. This stream should not be read other than by a storage engine.
 */

/* typal node_modules/@multipart/form-data/types/misc.xml ignore:_goa.Middleware namespace */
/**
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 * @typedef {_multipart.FormDataFileFilter} FormDataFileFilter The function to control which files are accepted.
 * @typedef {(req: !http.IncomingMessage, file: !_multipart.FormDataFile) => void} _multipart.FormDataFileFilter The function to control which files are accepted.
 * @typedef {_multipart.FormData} FormData `＠interface` An instance to create middleware.
 * @typedef {Object} _multipart.FormData `＠interface` An instance to create middleware.
 * @prop {(name: string) => !_goa.Middleware} single Accept a single file.
 * @prop {(name: string, maxFiles: string) => !_goa.Middleware} array Accept multiple files.
 * @prop {(fields: !Array<_multipart.FormDataField>) => !_goa.Middleware} fields Accept files according to the configured fields.
 * @prop {() => !_goa.Middleware} none Do not accept files, only fields.
 * @prop {() => !_goa.Middleware} any Accept any fields and files.
 * @typedef {_multipart.FormDataStorageEngine} FormDataStorageEngine `＠interface`
 * @typedef {Object} _multipart.FormDataStorageEngine `＠interface`
 * @prop {(req: !http.IncomingMessage, file: !_multipart.FormDataFile) => void} _handleFile Saves the file asynchronously.
 * @prop {(req: !http.IncomingMessage, file: !_multipart.FormDataFile) => void} _removeFile Removes the file asynchronously.
 * @typedef {_multipart.FormDataField} FormDataField The item to use in the `.fields` method.
 * @typedef {Object} _multipart.FormDataField The item to use in the `.fields` method.
 * @prop {string} name The name of the field.
 * @prop {number} [maxCount] The maximum count of the field.
 * @typedef {_multipart.FormDataError} FormDataError `＠interface` An error object which extends Error.
 * @typedef {Object} _multipart.FormDataError `＠interface` An error object which extends Error.
 * @prop {string} code The error code.
 * @prop {string} [field] The field which resulted in error.
 */

/* typal node_modules/@goa/busboy/types/index.xml ignore:_goa.BusBoyConfig,_goa.BusBoy namespace */
/**
 * @typedef {_goa.BusBoyLimits} BusBoyLimits `＠record` Various limits on incoming data.
 * @typedef {Object} _goa.BusBoyLimits `＠record` Various limits on incoming data.
 * @prop {number} [fieldNameSize=100] Max field name size in bytes. Default `100`.
 * @prop {number} [fieldSize=1024] Max field value size in bytes. Default `1024`.
 * @prop {number} [fields=Infinity] Max number of non-file fields. Default `Infinity`.
 * @prop {number} [fileSize=Infinity] For multipart forms, the max file size in bytes. Default `Infinity`.
 * @prop {number} [files=Infinity] For multipart forms, the max number of file fields. Default `Infinity`.
 * @prop {number} [parts=Infinity] For multipart forms, the max number of parts (fields + files). Default `Infinity`.
 * @prop {number} [headerPairs=2000] For multipart forms, the max number of header key=> value pairs to parse. Default `2000`.
 */


/**
 * @typedef {import('../..').Middleware} _goa.Middleware
 */