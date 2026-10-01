import {
  ShieldCheck, FileCheck2, Award, Headset, Boxes, MapPin, Clock, Leaf, BadgeCheck,
  Truck, Zap, Flame, Droplets, Users, Star, Building2, Globe, Handshake, TrendingUp, Cpu,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  ShieldCheck, FileCheck2, Award, Headset, Boxes, MapPin, Clock, Leaf, BadgeCheck,
  Truck, Zap, Flame, Droplets, Users, Star, Building2, Globe, Handshake, TrendingUp, Cpu,
};

export const iconNames = Object.keys(iconMap);

export const getIcon = (name?: string): LucideIcon => (name && iconMap[name]) || BadgeCheck;
