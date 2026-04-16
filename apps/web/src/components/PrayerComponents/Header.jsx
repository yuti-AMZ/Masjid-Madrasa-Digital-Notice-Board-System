import { Download, LocateFixed, MapPin } from "lucide-react";

export default function Header({ locationLabel, headerDate }) {
  return (
    <header className="page-header">
      <div className="page-header__text">
        <h1 className="page-header__title">Prayer Times</h1>
        <p className="page-header__meta">
          <span className="page-header__pin" aria-hidden="true">
            <MapPin size={16} strokeWidth={2} />
          </span>
          <span>{locationLabel} • {headerDate}</span>
        </p>
      </div>

      <div className="page-header__actions">
        <button type="button" className="btn btn--outline">
          <LocateFixed size={16} strokeWidth={2} />
          Update Location
        </button>
        <button type="button" className="btn btn--primary">
          <Download size={16} strokeWidth={2} />
          Download PDF
        </button>
      </div>
    </header>
  );
}
