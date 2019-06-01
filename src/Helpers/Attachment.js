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
      accessKeyId: process.env.REACT_APP_Access_Key_ID,
      secretAccessKey: process.env.REACT_APP_Secret_Access_Key,
    }
  }

  /**
   * Upload file to AWS S3 cloud.
   *
   * @param {object} file
   * @returns {string} location
   */
  upload = async file => {
    console.log('file is : ', file)
    console.log('file type is : ', file.type)

    const data = await uploadFile(file, this.config)
    console.log('path er her vid : ', data.location)
    return data.location
    // console.log('file is : ', file)
    // console.log('file type is : ', file.type)
    // let path
    // uploadFile(file, this.config)
    //   .then(data => {
    //     console.log('data: ', data)
    //     path = data.location
    //   })
    //   .catch(err => {
    //     console.log('Err: ', err)
    //   })

    // console.log('path er her vid : ', path)
    // return path
  }
}

export default Attachment
