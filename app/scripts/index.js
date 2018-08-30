import 'babel-polyfill'

import Affix from './components/affix'
import Accessibility from './components/accessibility'
import AccessibilityButton from './components/accessibility-button'
import BackgroundText from './components/background-text'
import Breadcrumbs from './components/breadcrumbs'
import Accordion from './components/accordion'
import ClassOverview from './components/class-overview'
import CopyEnhance from './components/copy-enhance'
import ClassesFilter from './components/classes-filter'
import CTACards from './components/cta-cards'
import FeedbackForm from './components/feedback-form'
import FloatingImageEnhance from './components/floating-image'
import Form from './components/form'
import FrameEnhance from './components/frame-enhance'
import GalleryEnhancement from './components/gallery-enhancements'
import HeroCarousel from './components/hero-carousel'
import HeaderFilter from './components/header-filter'
import HeaderScroll from './components/header-scroll'
import HeroLines from './components/hero-lines'
import LinkCardSlider from './components/link-card-slider'
import LinkCardDragger from './components/link-card-dragger'
import LoadMore from './components/load-more'
import Modal from './components/modal'
import Navigation from './components/navigation'
import Parallax from './components/parallax'
// import QuarterFilter from './components/quarter-filter'
import QuickNav from './components/quick-nav'
import ResourceBlurb from './components/resource-blurb'
import ResourceFilter from './components/resource-filter'
import ResourceList from './components/resource-list'
import ResourceStatistics from './components/resource-statistics'
import ResourceSteps from './components/resource-steps'
import SearchComponent from './components/search'
import SearchEnhance from './components/search-enhance'
import Slideshow from './components/slideshow'
import StorySlider from './components/story-slider'
import TeamDirectory from './components/team-directory'
import TeamMember from './components/team-member'
import TeamSpotlight from './components/team-spotlight'
import TimeSlots from './components/classes-timeslots'
import Waypoint from './components/waypoint'
import { calculateScrollbarWidth, getCookie } from './utilities'

calculateScrollbarWidth({ mediaQuery: '(max-width: 749px)' })

Affix.init()
Accessibility.init()
AccessibilityButton.init()
Accordion.init()
BackgroundText.init()
Breadcrumbs.init()
ClassOverview.init()
CopyEnhance.init()
ClassesFilter.init()
CTACards.init()
FeedbackForm.init()
FloatingImageEnhance.init()
Form.init()
FrameEnhance.init()
GalleryEnhancement.init()
HeaderFilter.init()
HeaderScroll.init()
HeroCarousel.init()
HeroLines.init()
LinkCardSlider.init()
LinkCardDragger.init()
LoadMore.init()
Navigation.init()
Modal.init()
Parallax.init()
// QuarterFilter.init()
QuickNav.init()
ResourceBlurb.init()
ResourceFilter.init()
ResourceList.init()
ResourceStatistics.init()
ResourceSteps.init()
SearchComponent.init()
SearchEnhance.init()
Slideshow.init()
StorySlider.init()
TeamDirectory.init()
TeamMember.init()
TeamSpotlight.init()
TimeSlots.init()
Waypoint.init()

// check for accessibility in cookies
const accessibilityValue = getCookie('accessibility')
if (accessibilityValue && accessibilityValue === 'true') {
  Accessibility.accessibilityOn()
} else {
  Accessibility.accessibilityOff()
}
