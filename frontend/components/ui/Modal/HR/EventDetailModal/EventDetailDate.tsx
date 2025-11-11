import { Card, CardBody } from "@heroui/react";
import { FiCalendar } from "react-icons/fi";

interface EventDetailDateProps {
  formattedDates: {
    confirmed: {
      formatted: string;
      full: string;
    } | null;
    proposed: Array<{
      formatted: string;
      full: string;
    }>;
  };
}

export function EventDetailDate({ formattedDates }: EventDetailDateProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <FiCalendar className="text-default-500" size={18} />
        <h4 className="text-sm font-semibold text-default-700">
          {formattedDates.confirmed
            ? "Confirmed Date & Time"
            : "Proposed Dates"}
        </h4>
      </div>

      {formattedDates.confirmed ? (
        <Card className="bg-success-50 border border-success-200 shadow-sm">
          <CardBody className="py-4">
            <div className="flex items-center gap-4">
              <div className="bg-success-100 p-3 rounded-full">
                <FiCalendar className="text-success-700" size={20} />
              </div>
              <div>
                <p className="font-semibold text-success-800 text-base">
                  {formattedDates.confirmed.formatted}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      ) : formattedDates.proposed.length > 0 ? (
        <div className="space-y-2">
          {formattedDates.proposed.map((proposedDate, index) => (
            <div key={index} className="p-3 rounded border border-default-200">
              <p className="text-sm text-default-700">
                {proposedDate.formatted}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <Card className="bg-default-50 border border-default-200">
          <CardBody className="py-4 text-center">
            <p className="text-default-500">No dates proposed yet</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
