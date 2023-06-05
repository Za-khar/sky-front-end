export const generateFormData = (
  data: Object,
  imageProps?: Array<string>,
): FormData => {
  const formData = new FormData()

  Object.entries(data).forEach(([prop, value]) => {
    if (value === undefined) {
      return
    }

    // If prop has images
    if (imageProps?.includes(prop)) {
      // image prop has array of images
      if (Array.isArray(value)) {
        value.forEach((image) => {
          formData.append(prop, {
            uri: image,
            name: image?.split('/')?.[image?.split('/')?.length - 1],
            type: `image/${image?.split('.').pop()}`,
          })
        })

        return
      }

      formData.append(prop, {
        uri: value,
        name: value?.split('/')?.[value?.split('/')?.length - 1],
        type: `image/${value?.split('.').pop()}`,
      })

      return
    }

    // if simple type object or array of objects
    if (typeof value === 'object' || Array.isArray(value)) {
      formData.append(prop, JSON.stringify(value))
      return
    }

    formData.append(prop, value)
  })

  return formData
}
