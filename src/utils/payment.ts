import { v4 as uuidv4 } from 'uuid'

interface PaymentInitParams {
  totalAmount: number
  description: string
  eventTitle: string
  ticketType: string
}

export const initializeHubtelPayment = async ({ totalAmount, description, eventTitle, ticketType }: PaymentInitParams) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic UTFwTmdaWTpmMmJiYzJmOWViYTk0NmVjODNjM2I0MjgzYTQyMzM3Mw==',
    }

    const reference = `inv${uuidv4()?.slice(0, 5)}`

    // Get the base URL of the current window
    const baseUrl = window.location.origin

    const data = {
      totalAmount,
      description: `${eventTitle} - ${ticketType} Ticket Purchase: ${description}`,
      callbackUrl: "https://webhook.site/bec30f36-4b2d-44b3-9d81-0864bb6d908d",
      merchantAccountNumber: "2023310",
      returnUrl: `${baseUrl}/success`,
      cancellationUrl: `${baseUrl}/canceled`,
      clientReference: reference
    }

    const response = await fetch('https://payproxyapi.hubtel.com/items/initiate', {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    })

    const result = await response.json()

    if (result?.data?.checkoutUrl) {
      // Store payment info in localStorage for reference
      localStorage.setItem('currentPayment', JSON.stringify({
        ...result?.data,
        reference,
        amount: totalAmount,
        eventTitle,
        ticketType,
        timestamp: new Date().toISOString()
      }))
      
      // Redirect to Hubtel checkout
      window.open(result?.data?.checkoutUrl, '_blank')

    } else {
      throw new Error('Payment initialization failed')
    }

  } catch (error) {
    console.error('Payment error:', error)
    throw error
  }
} 