import { cloudinaryAPI as cloudinary } from '../../cloudinaryConfig.js'

/**
 * Extracts the public_id from a Cloudinary URL
 * @param {string} cloudinaryUrl - The Cloudinary secure URL
 * @returns {string|null} - The public_id or null if invalid URL
 */
export const extractPublicIdFromUrl = (cloudinaryUrl) => {
  if (!cloudinaryUrl) return null

  try {
    // Cloudinary URL formats:
    // https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}.{extension}
    // https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{folder}/{filename}.{extension}
    
    const urlParts = cloudinaryUrl.split('/upload/')
    if (urlParts.length !== 2) return null

    let afterUpload = urlParts[1]
    
    // Remove file extension
    const withoutExtension = afterUpload.split('.').slice(0, -1).join('.')
    
    // Remove version prefix if it exists (v{number}/)
    // Version format: v1234567890/path/to/file
    const versionPattern = /^v\d+\//
    const publicId = withoutExtension.replace(versionPattern, '')
    
    return publicId || null
  } catch (error) {
    console.error('Error extracting public_id from Cloudinary URL:', error)
    return null
  }
}

/**
 * Deletes a resource from Cloudinary
 * @param {string} cloudinaryUrl - The Cloudinary secure URL or public_id
 * @returns {Promise<boolean>} - True if deletion was successful, false otherwise
 */
export const deleteCloudinaryResource = async (cloudinaryUrl) => {
  if (!cloudinaryUrl) return false

  try {
    const publicId = extractPublicIdFromUrl(cloudinaryUrl)

    if (!publicId) {
      console.warn('Could not extract public_id from URL:', cloudinaryUrl)
      return false
    }

    const result = await cloudinary.uploader.destroy(publicId)

    if (result.result === 'ok') {
      console.log(`Successfully deleted Cloudinary resource: ${publicId}`)
      return true
    } else if (result.result === 'not found') {
      // Resource already deleted or doesn't exist - treat as success
      console.log(`Cloudinary resource not found (already deleted): ${publicId}`)
      return true
    } else {
      console.warn(`Failed to delete Cloudinary resource ${publicId}:`, result)
      return false
    }
  } catch (error) {
    console.error('Error deleting Cloudinary resource:', error)
    return false
  }
}

/**
 * Deletes multiple resources from Cloudinary
 * @param {array} cloudinaryUrls - Array of Cloudinary URLs or public_ids
 * @returns {Promise<object>} - Object with success and failed counts
 */
export const deleteMultipleCloudinaryResources = async (cloudinaryUrls) => {
  if (!cloudinaryUrls || cloudinaryUrls.length === 0) {
    return { success: 0, failed: 0 }
  }

  const results = await Promise.all(
    cloudinaryUrls.map(url => deleteCloudinaryResource(url))
  )

  const success = results.filter(r => r === true).length
  const failed = results.filter(r => r === false).length

  return { success, failed }
}
