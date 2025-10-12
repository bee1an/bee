import type { ContactInfo } from '@/types/contact'

export interface ContactAction {
  type: 'email' | 'phone' | 'social' | 'custom'
  value: string
  label?: string
}

export interface UseContactReturn {
  handleContact: (action: ContactAction) => void
  validateEmail: (email: string) => boolean
  validatePhone: (phone: string) => boolean
  formatPhoneNumber: (phone: string) => string
  copyToClipboard: (text: string) => Promise<boolean>
  shareContact: (contactInfo: ContactInfo) => void
}

// 处理邮件
function handleEmail(email: string) {
  const subject = encodeURIComponent('来自个人网站的咨询')
  const body = encodeURIComponent('您好，我通过您的个人网站联系您。\n\n')
  window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank')
}

// 处理电话
function handlePhone(phone: string) {
  // 在移动设备上尝试直接拨号
  if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.open(`tel:${phone}`, '_blank')
  }
  else {
    // 在桌面设备上复制到剪贴板
    const handleCopyContact = async (text: string): Promise<boolean> => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text)
          return true
        }
        else {
          const textArea = document.createElement('textarea')
          textArea.value = text
          textArea.style.position = 'fixed'
          textArea.style.left = '-999999px'
          textArea.style.top = '-999999px'
          document.body.appendChild(textArea)
          textArea.focus()
          textArea.select()

          const successful = document.execCommand('copy')
          document.body.removeChild(textArea)
          return successful
        }
      }
      catch (error) {
        console.error('Failed to copy text to clipboard:', error)
        return false
      }
    }

    handleCopyContact(phone).then((success: boolean) => {
      if (success) {
        // 可以显示一个通知提示复制成功
        // Note: 考虑使用 UI 通知替代 console.log
      }
    })
  }
}

// 处理社交媒体链接
function handleSocial(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

// 处理自定义操作
function handleCustom(action: ContactAction) {
  if (action.label && action.value.startsWith('http')) {
    // 如果是URL，在新窗口打开
    window.open(action.value, '_blank', 'noopener,noreferrer')
  }
  else if (action.value.startsWith('mailto:')) {
    // 如果是邮件链接
    window.open(action.value, '_blank')
  }
  else {
    // 其他情况复制到剪贴板
    const handleCopyText = async (text: string): Promise<boolean> => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text)
          return true
        }
        else {
          const textArea = document.createElement('textarea')
          textArea.value = text
          textArea.style.position = 'fixed'
          textArea.style.left = '-999999px'
          textArea.style.top = '-999999px'
          document.body.appendChild(textArea)
          textArea.focus()
          textArea.select()

          const successful = document.execCommand('copy')
          document.body.removeChild(textArea)
          return successful
        }
      }
      catch (error) {
        console.error('Failed to copy text to clipboard:', error)
        return false
      }
    }

    handleCopyText(action.value)
  }
}

export function useContact(): UseContactReturn {
  // 处理联系操作
  const handleContact = (action: ContactAction) => {
    switch (action.type) {
      case 'email':
        handleEmail(action.value)
        break
      case 'phone':
        handlePhone(action.value)
        break
      case 'social':
        handleSocial(action.value)
        break
      case 'custom':
        handleCustom(action)
        break
      default:

        console.warn('Unknown contact action type:', action.type)
    }
  }

  // 验证邮箱格式
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // 验证电话号码格式
  const validatePhone = (phone: string): boolean => {
    // 支持国际电话号码格式
    const phoneRegex = /^\+?\(?\d{1,4}\)?[-\s.]?\(?\d{1,4}\)?[-\s.]?\d{1,9}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  // 格式化电话号码显示
  const formatPhoneNumber = (phone: string): string => {
    // 移除所有非数字字符，保留+号
    const cleaned = phone.replace(/[^\d+]/g, '')

    // 如果是中国手机号，格式化为 XXX-XXXX-XXXX
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`
    }

    // 其他情况返回原格式
    return phone
  }

  // 复制到剪贴板
  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // 使用现代 Clipboard API
        await navigator.clipboard.writeText(text)
        return true
      }
      else {
        // 降级方案：使用 document.execCommand
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()

        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)
        return successful
      }
    }
    catch (error) {
      console.error('Failed to copy text to clipboard:', error)
      return false
    }
  }

  // 分享联系信息
  const shareContact = async (contactInfo: ContactInfo) => {
    if (!navigator.share) {
      // 如果不支持 Web Share API，复制联系信息到剪贴板
      const contactText = `
姓名：bee1an
邮箱：${contactInfo.email}
${contactInfo.phone ? `电话：${contactInfo.phone}` : ''}
${contactInfo.socialLinks && contactInfo.socialLinks.length > 0 ? `社交媒体：${contactInfo.socialLinks.map((link: any) => link.url).join(', ')}` : ''}
      `.trim()

      const success = await copyToClipboard(contactText)
      if (success) {
        // eslint-disable-next-line no-console
        console.log('联系信息已复制到剪贴板')
      }
      return
    }

    // 使用 Web Share API
    try {
      await navigator.share({
        title: '联系方式',
        text: `邮箱：${contactInfo.email}${contactInfo.phone ? `\n电话：${contactInfo.phone}` : ''}`,
        url: window.location.href,
      })
    }
    catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Failed to share contact info:', error)
      }
    }
  }

  return {
    handleContact,
    validateEmail,
    validatePhone,
    formatPhoneNumber,
    copyToClipboard,
    shareContact,
  }
}
