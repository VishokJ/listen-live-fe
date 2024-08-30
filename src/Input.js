import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
    return (
        <div className="mb-3 row">
            <label htmlFor={props.name} className="form-label col-sm-2"><strong>{props.title}</strong></label>
            <div className="col-sm-20">
                <input
                    id={props.name}
                    autoComplete={props.autoComplete}
                    type={props.type}
                    className={props.className}
                    ref={ref}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
});

export default Input;