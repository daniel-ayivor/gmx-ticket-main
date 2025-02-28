type EventCategory = {
    id: number;
    name: string;
    description: string;
    icon: string;
    is_active: boolean;
    event_count: string;
    created_at: string; 
  };
  
 export type EventType = {
  id: number;
  title: string;
  description: string;
  start_date: string; 
  end_date: string; 
  duration: string;
  is_free: boolean;
  venue: string;
  venue_address:string,
  category: EventCategory;
  category_id: number;
  age_restriction: number;
  schedule: string;
  artists_list: string[];
  sponsors_list: string[];
  facilities_list: string[];
  highlights_list: string[];
  featured: boolean;
  created_at: string; 
  updated_at: string; 
  min_ticket_price: string;
  image?:string
  };
  

  type TicketOption = {
    id: number;
    name: string;
    description: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export type TicketType ={
    id: number;
    ticket_type: TicketOption;
    price: string;
    quantity: number;
    sold_count: number;
    whats_included: string;
    whats_included_list: string[];
    available_quantity: number;
    created_at: string;
    updated_at: string;
  }


  export type OrderType ={
    ticket_id: number,
    quantity: number,
    status: string
  }