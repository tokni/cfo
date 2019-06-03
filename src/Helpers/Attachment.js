import { uploadFile } from 'react-s3'

/**
 * Attachment
 *
 * @function upload
 * @function download
 */
class Attachment {
  constructor(props) {
    this.config = {
      bucketName: 'cfoproject-file-endpoint',
      dirName: props ? props.type : 'default',
      region: 'eu-west-2',
      accessKeyId: process.env.REACT_APP_AWS_Access_Key_ID,
      secretAccessKey: process.env.REACT_APP_AWS_Secret_Access_Key,
    }
  }

  /**
   * Upload file to AWS S3 cloud.
   *
   * @param {object} file
   * @returns {string} location
   */
  upload = async file => {
    const data = await uploadFile(file, this.config)
    return data.location
  }
}

export default Attachment
