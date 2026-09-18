// Eén object per taal, samengesteld uit losse bestanden per gebied. Elk bestand heeft
// zijn eigen top-level namespaces; dezelfde namespace in twee bestanden zou elkaar
// overschrijven, dus houd ze uniek per bestand.
import common from "./common.json";
import home from "./home.json";
import services from "./services.json";
import about from "./about.json";
import work from "./work.json";
import booking from "./booking.json";

const messages = { ...common, ...home, ...services, ...about, ...work, ...booking };

export default messages;
